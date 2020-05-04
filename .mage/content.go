// +build mage

package main

import (
	"bufio"
	"bytes"
	"encoding/json"
	"io/ioutil"
	"os"
	"path"
	"path/filepath"
	"strings"

	"github.com/ghodss/yaml"
	"github.com/magefile/mage/mg"
	"github.com/magefile/mage/sh"
	ntos "go.ntrrg.dev/ntgo/os"
)

var (
	cfg struct {
		Params struct {
			Projects []string `json:"projects"`
		} `json:"params"`
	}

	outputDir = "public"

	gitRepos = filepath.Join(os.TempDir(), "ntweb-git-repos")

	cacheFile = "cache.json"
	cacheDir  = filepath.Join(os.TempDir(), "ntweb-cache")
)

type Gen mg.Namespace

func (Gen) Default() {
	mg.SerialDeps(Gen.Projects, Gen.Cache)
}

func (Gen) Clean() error {
	return sh.Rm(gitRepos)
}

///////////
// Cache //
///////////

func (Gen) Cache() error {
	err := sh.RunV("hugo", "--cleanDestinationDir", "-d", cacheDir)
	if err != nil {
		return err
	}

	var files []string

	fn := func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if info.IsDir() || path == filepath.Join(cacheDir, cacheFile) {
			return nil
		}

		path = strings.TrimPrefix(path, cacheDir)
		files = append(files, path)

		if filepath.Base(path) == "index.html" {
			path = filepath.Dir(path)
			files = append(files, path)
			files = append(files, path+"/")
		}

		return nil
	}

	if err := filepath.Walk(cacheDir, fn); err != nil {
		return err
	}

	data, err := json.Marshal(files)
	if err != nil {
		return err
	}

	return ioutil.WriteFile(filepath.Join("static", cacheFile), data, 0644)
}

//////////////
// Projects //
//////////////

var (
	prjsDir = filepath.Clean("content/projects")
)

func (Gen) Projects() error {
	for _, repoUrl := range cfg.Params.Projects {
		name := path.Base(repoUrl)
		prjRepo := filepath.Join(gitRepos, name)

		if err := cloneRepo(prjRepo, repoUrl); err != nil {
			return err
		}

		src := filepath.Join(prjRepo, ".ntweb")
		dst := filepath.Join(prjsDir, name)

		if err := sh.Rm(dst); err != nil {
			return err
		}

		if err := ntos.Cp(dst, src); err != nil {
			return err
		}

		output, err := sh.Output("git", "-C", prjRepo, "log", `--format=%cI`)
		if err != nil {
			return err
		}

		publishedAt := output[strings.LastIndexByte(output, '\n')+1:]
		modifiedAt := output[:strings.IndexByte(output, '\n')]

		license, err := getLincense(filepath.Join(prjRepo, "LICENSE"))
		if err != nil {
			return err
		}

		metadata := []byte(`---
publishdate: ` + publishedAt + `
date: ` + modifiedAt + `
metadata:
  source-code: ` + repoUrl + `
  license: ` + license + `
`)

		indexes, err := filepath.Glob(dst + "/index.*.md")
		if err != nil {
			return err
		}

		for _, index := range indexes {
			content, err := ioutil.ReadFile(index)
			if err != nil {
				return err
			}

			content = content[bytes.IndexByte(content, '\n')+1:]

			if bytes.HasPrefix(content, []byte("metadata:")) {
				content = content[bytes.IndexByte(content, '\n')+1:]
			}

			content = append(metadata, content...)

			fi, err := os.Stat(index)
			if err != nil {
				return err
			}

			if err := ioutil.WriteFile(index, content, fi.Mode()); err != nil {
				return err
			}
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

	if err := sh.Run("git", "clone", src, dst); err != nil {
		if err := sh.Rm(dst); err != nil {
			return err
		}

		return err
	}

	return nil
}

func getLincense(path string) (string, error) {
	f, err := os.Open(path)
	if err != nil {
		return "", err
	}

	defer f.Close()

	s := bufio.NewScanner(f)

	for s.Scan() {
		switch {
		case bytes.Contains(s.Bytes(), []byte("The MIT License")):
			return "MIT", nil
		case bytes.Contains(s.Bytes(), []byte("DO WHAT THE FUCK YOU WANT TO")):
			return "WTFPL", nil
		}
	}

	return "", s.Err()
}

func writeMultiLangFile(
	path string, content map[string][]byte, mode os.FileMode,
) error {
	i := strings.LastIndex(path, ".")
	if i < 0 {
		i = len(path) - 1
	}

	ext := filepath.Ext(path)

	for lang, content := range content {
		path := path[:i] + "." + lang + ext

		err := ioutil.WriteFile(path, content, mode)
		if err != nil {
			return err
		}
	}

	return nil
}

func init() {
	buildDeps = append(buildDeps, Gen.Default)
	cleanDeps = append(cleanDeps, Gen.Clean)

	if err := os.MkdirAll(gitRepos, 0755); err != nil {
		panic(err)
	}

	// Read config file

	data, err := ioutil.ReadFile(hugoConfig)
	if err != nil {
		panic(err)
	}

	if err := yaml.Unmarshal(data, &cfg); err != nil {
		panic(err)
	}
}
