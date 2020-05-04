// +build mage

package main

import (
	"os"
	"os/user"

	"github.com/magefile/mage/mg"
	"github.com/magefile/mage/sh"
)

var (
	dockerOpts []string
)

type Docker mg.Namespace

func (Docker) Default() {
	mg.SerialDeps(Docker.Build)
}

func (Docker) Build() error {
	return runHugoDocker()
}

func (Docker) Run() error {
	dockerOpts = append(dockerOpts, "-p", hugoPort+":"+hugoPort)

	return runHugoDocker(
		"server", "-D", "-E", "-F", "--noHTTPCache", "--i18n-warnings",
		"--disableFastRender", "--bind", "0.0.0.0", "--port", hugoPort,
		"--baseUrl", "/", "--appendPort=false",
	)
}

func (Docker) Shell() error {
	dockerOpts = append(dockerOpts, "--entrypoint", "sh")

	return runHugoDocker()
}

func runHugoDocker(args ...string) error {
	opts := append(dockerOpts, "ntrrg/hugo:"+hugoVersion)

	return sh.RunV("docker", append(opts, args...)...)
}

func init() {
	if u := os.Getenv("USER"); u == "" {
		if err := os.Setenv("USER", os.Getenv("LOGNAME")); err != nil {
			panic(err)
		}
	}

	u, err := user.Current()
	if err != nil {
		panic(err)
	}

	wd, err := os.Getwd()
	if err != nil {
		panic(err)
	}

	dockerOpts = []string{
		"run", "--rm", "-i", "-t",
		"-u", u.Uid,
		"-v", wd + ":/site/",
	}
}
