// +build mage

package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
	"os/user"
	"path"
	"path/filepath"
	"regexp"
	"strings"

	hc "github.com/gohugoio/hugo/config"
	"github.com/magefile/mage/mg"
	"github.com/magefile/mage/sh"
	ntos "nt.web.ve/go/ntgo/os"
)

var (
	Default = Build.Default

	hugoVersion = "0.55.6"
	hugoPort    = "1313"
	hugoConfig  = "config.yaml"

	dockerImage = "ntrrg/ntweb"

	lintContainer = strings.Replace(dockerImage, "/", "-", -1) + "-lint"

	wd  string
	cfg hc.Provider

	prjDir   = filepath.Clean("content/projects")
	prjRepos = filepath.Join(os.TempDir(), "ntweb-projects")

	goDir   = filepath.Clean("content/go")
	goRepos = filepath.Join(os.TempDir(), "ntweb-go-pkgs")
)

type Build mg.Namespace

func (Build) Default() error {
	return sh.RunV("hugo")
}

func (Build) Docker() error {
	return runHugoDocker()
}

func Clean() error {
	_ = sh.RunV("docker", "rm", "-f", lintContainer)
	_ = sh.RunV("docker", "rm", "-f", lintContainer+"-watch")

	for _, dst := range []string{prjRepos, goRepos, "public", "resources"} {
		if err := sh.Rm(dst); err != nil {
			return err
		}
	}

	return nil
}

type Lint mg.Namespace

func (Lint) Default() {
	mg.Deps(Lint.Go, Lint.Md)
}

func (Lint) Go() error {
	return sh.RunV("gofmt", "-d", "-e", "-s", "magefile.go")
}

func (Lint) Md() error {
	return runMdLinter(lintContainer, "latest")
}

func (Lint) MdWatch() error {
	return runMdLinter(lintContainer+"-watch", "watch")
}

type Run mg.Namespace

func (Run) Default() error {
	return sh.RunV(
		"hugo", "server", "-D", "-E", "-F",
		"--noHTTPCache", "--port", hugoPort,
	)
}

func (Run) Docker() error {
	return runHugoDocker(
		"server", "-D", "-E", "-F", "--noHTTPCache",
		"--bind", "0.0.0.0", "--port", hugoPort,
		"--baseUrl", "/", "--appendPort=false",
	)
}

type Gen mg.Namespace

func (Gen) Default() {
	mg.Deps(Gen.GoPkgs, Gen.Projects)
}

func (Gen) GoPkgs() error {
	if err := os.MkdirAll(goRepos, 0755); err != nil {
		return err
	}

	srcRE, err := regexp.Compile(`(?:([\w/\-]+) )?(https?:/.+)`)
	if err != nil {
		return err
	}

	pkgRE, err := regexp.Compile(`([\w/\-.]+): (.+)?`)
	if err != nil {
		return err
	}

	for _, repo := range cfg.GetStringSlice("params.goPackages") {
		repoElems := srcRE.FindStringSubmatch(repo)
		name, src := repoElems[1], repoElems[2]

		if name == "" {
			name = path.Base(src)
		}

		dst := filepath.Join(goRepos, name)

		if err := cloneRepo(dst, src); err != nil {
			return err
		}

		c := exec.Command("go", "list", "-m")
		c.Dir = dst
		output, err := c.Output()
		if err != nil {
			return err
		}

		mod := string(bytes.TrimSpace(output))
		if err := writePackagePage(src, mod, mod, ""); err != nil {
			return err
		}

		c = exec.Command(
			"go", "list", "-f", "{{ .ImportComment }}: {{ .Doc }}", "./"+name+"/...",
		)

		c.Dir = goRepos
		output, err = c.Output()
		if err != nil {
			return err
		}

		for _, entry := range bytes.Split(bytes.TrimSpace(output), []byte("\n")) {
			elms := pkgRE.FindSubmatch(entry)

			if len(elms) < 3 {
				return fmt.Errorf("bad package format in module %s: %q", mod, entry)
			}

			pkg, doc := string(elms[1]), string(elms[2])

			if err := writePackagePage(src, mod, pkg, doc); err != nil {
				return err
			}
		}
	}

	return nil
}

func (Gen) Projects() error {
	if err := os.MkdirAll(prjRepos, 0755); err != nil {
		return err
	}

	for _, src := range cfg.GetStringSlice("params.projects") {
		name := path.Base(src)
		dst := filepath.Join(prjRepos, name)
		if err := cloneRepo(dst, src); err != nil {
			return err
		}

		src = filepath.Join(dst, ".ntweb")
		dst = filepath.Join(prjDir, name)

		if err := sh.Rm(dst); err != nil {
			return err
		}

		if err := ntos.Cp(dst, src); err != nil {
			return err
		}
	}

	return nil
}

func cloneRepo(dst, src string) error {
	if dst == "" {
		dst = path.Base(src)
	}

	if _, err := os.Stat(dst); err == nil {
		return sh.Run("git", "-C", dst, "pull", "origin", "master")
	}

	if err := sh.Run("git", "clone", "--depth", "1", src, dst); err != nil {
		if err := sh.Rm(dst); err != nil {
			return err
		}

		return err
	}

	return nil
}

func genPackagePage(src, mod, pkg, doc string) string {
	prefix := path.Dir(mod) + "/"
	pkg = strings.TrimPrefix(string(pkg), prefix)

	content := `
---
title: %s
source-code: %s
module: %s
description: %s
url: /go/%s
---
`[1:]

	return fmt.Sprintf(content, pkg, src, mod, doc, pkg)
}

func getHugoConfig(cfgFile string) (hc.Provider, error) {
	f, err := os.Open(cfgFile)
	if err != nil {
		return nil, err
	}

	defer f.Close()

	cfgData, err := ioutil.ReadAll(f)
	if err != nil {
		return nil, err
	}

	return hc.FromConfigString(string(cfgData), filepath.Ext(cfgFile))
}

func runHugoDocker(args ...string) error {
	u, err := user.Current()
	if err != nil {
		return err
	}

	args = append([]string{
		"run", "--rm", "-i", "-t",
		"-u", u.Uid,
		"-v", wd + ":/srv/",
		"-p", hugoPort + ":" + hugoPort,
		"ntrrg/hugo:" + hugoVersion,
	}, args...)

	return sh.RunV("docker", args...)
}

func runMdLinter(name, tag string) error {
	err := sh.RunV("docker", "start", "-a", "-i", name)

	if err != nil {
		return sh.RunV(
			"docker", "run", "--name", name, "-i", "-t",
			"-v", wd+":/files/",
			"ntrrg/md-linter:"+tag,
		)
	}

	return nil
}

func writeMultiLangFile(path string, content []byte, mode os.FileMode) error {
	i := strings.LastIndex(path, ".")
	if i < 0 {
		i = len(path) - 1
	}

	ext := filepath.Ext(path)

	for lang := range cfg.GetStringMap("languages") {
		path := path[:i] + "." + lang + ext

		err := ioutil.WriteFile(path, content, mode)
		if err != nil {
			return err
		}
	}

	return nil
}

func writePackagePage(src, mod, pkg, doc string) error {
	return writeMultiLangFile(
		filepath.Join(goDir, strings.ReplaceAll(pkg, "/", "-")+".md"),
		[]byte(genPackagePage(src, mod, pkg, doc)), 0644,
	)
}

func init() {
	var err error

	wd, err = os.Getwd()
	if err != nil {
		panic(err)
	}

	cfg, err = getHugoConfig(hugoConfig)
	if err != nil {
		panic(err)
	}
}
