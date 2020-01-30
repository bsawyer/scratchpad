# Scratchpad CLI
## What is it?
`scratchpad` is a cli for managing one git repository where every branch is a "page".

## Why would I want that?
- Keep notes separate from actual source code
- Maintain the benefits of source control without the need for keeping track of branches or commit messages
- Easily switch between project notes with one command


## Pages
Each page is simply one markdown file that gets committed to its own branch

## Commands
### init
**Description**

initializes a git repository at $`HOME/scratchpad` with a blank mardown file `page.md`

**Usage**
```
~ scratchpad init
Initialized scratchpad at '$HOME/scratchpad/page.md'
```

### flip
**Description**

Flipping to a page stages and commits the current page then checks out the target pages branch. If a page is not specified it checks out a new branch.

**Usage**
```
~ scratchpad flip
Flipped to page 2

~ scratchpad flip 1
Flipped to page 1
```

### bookmark

**Description**

Creates a symbolic ref to the current pages branch. If no name is specified it just stages and commits the current pages branch.

**Usage**
```
~ scratchpad bookmark meeting-notes
Bookmarked page 2 as meeting-notes

~ scratchpad flip
Flipped to page 3

~ scratchpad flip meeting-notes
Flipped to page 2
```

### trash

**Description**

Deletes target pages symbolic refs and branch.

**Usage**
```
~ scratchpad trash 1
Trashed page 1
```
## Config
By default the git repository is initialized in `$HOME/scratchpad` and a markdown file `page.md` is used as a page. It's possible to change these by creating a file `$HOME/.scratchrc`
```
scratchpadDir=$HOME/scratchpad
scratchpadFilename=page.md
```

## Install

clone this repo
`git clone`

symlink the script
`ln -s ./scratchpad $HOME/bin/scratchpad`

## Misc.

- Bookmarks can't start with a number ;)
- I keep `page.md` as a pinned tab in my IDE for easy note taking
- A neat trick is to associate a page with a particular branch in another repository on your local machine simply by adding a hook to `.git/hooks/post-checkout` that flips to a page mapped to the branch
