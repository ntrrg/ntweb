# Contributing Guide

Any contribution to this project means implicitly that you accept the
[code of conduct](CODE_OF_CONDUCT.md) from this project.

## Requirements

[Hugo]: https://gohugo.io/
[Git]: https://git-scm.com/

* [Hugo][] >= 0.72

* [Git][] (or use the GitHub web interface)

## Guidelines

* **Git commit messages:** <https://chris.beams.io/posts/git-commit/>.

* **Git branching model:** <https://guides.github.com/introduction/flow/>.

## Instructions

1. Create a new branch with a short name that describes the changes that you
   intend to do. If you don't have permissions to create branches, fork the
   project and do the same in your forked copy.

2. Add yourself as an author (if you are not already).

   1. Create an `index.LANG.md` for you. `LANG` may be `en` or `es`, if you are
      creating content for just one language, it makes sense to create only the
      index file for that language, but you can create all of them.

      ```shell-session
      $ hugo new authors/john-doe/index.en.md
      ```

   2. Customize the file with your information using your favorite text editor.

      ```shell-session
      $ EDITOR content/authors/john-doe/index.
      ```

3. Create your content in the `content/blog/contrib` directory. The file
   `themes/hugo-base/content/blog/demo/index.en.md` is a good syntax reference.

   1. Create a new `index.LANG.md` for your article. `LANG` may be `en` or
      `es`, depending on the content language.

      ```shell-session
      $ hugo new blog/contrib/my-article/index.en.md
      ```

   2. Write the article's content using your favorite text editor.

      ```shell-session
      $ EDITOR content/blog/my-article/index.en.md
      ```

4. Run the Hugo server and check your article in <http://localhost:1313>.

   ```shell-session
   $ # If you have make installed
   $ make run
   $
   $ # If not
   $ hugo server -DEF
   ```

5. Push your changes and create a [pull request](https://github.com/ntrrg/ntweb/compare)
   to the `master` branch.

