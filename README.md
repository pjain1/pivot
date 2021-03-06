# Pivot

Pivot is a web-based exploratory visualization UI for [Druid](https://github.com/druid-io/druid) built on top of 
[Plywood](https://github.com/implydata/plywood). 

The project is currently in the alpha stage and is undergoing rapid development.
Internal and external APIs may change with little notice.

## Features

**Drag-and-drop UI**

![Drag to Split](https://github.com/implydata/pivot/raw/master/assets/images/drag-and-drop.gif)

**Contextual exploration**

![Time Highlight](https://github.com/implydata/pivot/raw/master/assets/images/explore.gif)

**Comparisons**

![Time Highlight](https://github.com/implydata/pivot/raw/master/assets/images/compare.gif)

## Usage

### Ensure that you have an up-to-date node

Make sure you have node (4.x.x) installed. On MacOS with [homebrew](http://brew.sh/) you can do:

```
brew update
brew install node
```

### Install

Next simply run:

```
npm i -g imply-pivot
```

**That's it.** You are ready to Pivot.


### Example

Start off by running an example (static) dataset:

```
pivot --example wiki
```

### Run with Druid

Next connect Pivot to your broker by simply pointing it to your broker host

```
pivot --druid your.druid.broker.host:8082
```

Pivot will automatically introspect your Druid cluster and figure out your dimensions and measures.

**Note:** if Pivot starts up and gives you a query error it is most likely because it could not properly introspect your schema.
You probably have some *hyperUnique* column that Pivot is trying to SUM over.
You will have to provide Pivot with a config file as in the nest section.   

### Create a config

In general Pivot will never know your schema as well as you.
To get a better experience you should create a config and provide it to Pivot.
The fastest way to create a config is to have Pivot do it for you.

```
pivot --druid your.druid.broker.host:8082 --print-config --with-comments > config.yaml
```

The `--print-config` option will make Pivot run through its regular introspection and then, instead of spinning up a server, dump the YAML onto the stdout and exit.  

```
pivot --config config.yaml
```

The next step is to examine and tweak the config using your favorite editor `nano config.yaml`.

## Development

Here are the steps to clone Pivot and run it as a developer. 

Firstly make sure you have gulp installed globally:

```
npm i -g gulp
```

Clone the project

```
git clone git@github.com:implydata/pivot.git
cd pivot
```

Inside the pivot folder run:

```
npm install
gulp
```

Finally you have to create a `config.yaml` file. (or use the sample)

```
./bin/pivot --druid your.druid.broker.host:8082 --print-config --with-comments > config.yaml
```

The `--with-comments` flag adds docs about what goes into the config.
Alternatively you can read the comments in the [sample config file](/config.yaml.sample).

Then you are ready to

```
./bin/pivot --config config.yaml
```

## Roadmap

**Recent improvements:**

- Comparing multiple dimension values on a time series
- Multiple selections and search from pinned dimensions
- Introspection writes a config file
- Fixed issue where adding too many filters made some of them inaccessible

**We will be working on:**

- Additional visualizations (bar chart and geo)
- Exclusion filters
- Better comparison behavior and legend interaction
- Better time selection
- Various additions, improvements and fixes to make the app more complete

## Questions & Support

Please direct all questions to our [user groups](https://groups.google.com/forum/#!forum/imply-user-group).
