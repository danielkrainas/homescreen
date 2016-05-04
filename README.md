# Homescreen

Homescreen is an application launcher intended for use in HTPC situation. 

## Installation

Install with `npm`:

> $ npm install -g homescreen

## Usage

Run with the `homescreen` command:

> $ homescreen

## Configuration

The configuration file tells homescreen which launchers to display. A configuration file can either be specified as a parameter at runtime, specified in the `HOMESCREEN_CONFIG` environment variable, or by putting a `.homescreen.json` file in the user's home directory. 

### Example

```js
{
	"launchers": [
		{
			"title": "TV",
			"icon": "fa-tv",
			"cmd": "/path/to/executable/to/launch --with-params"
		},
		{...}
	]
}
```

### Usage

Implicitly using the `.homescreen.json` file in your home directory:

> $ homescreen

As an argument:

> $ homescreen path/to/config/file.json

As an environment variable:

> $ HOMESCREEN_CONFIG=path/to/config/file.json homescreen

## License

[Unlicense](http://unlicense.org/UNLICENSE). This is a Public Domain work. 

[![Public Domain](https://licensebuttons.net/p/mark/1.0/88x31.png)](http://questioncopyright.org/promise)

> ["Make art not law"](http://questioncopyright.org/make_art_not_law_interview) -Nina Paley