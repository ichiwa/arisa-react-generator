# arisa-generator [![npm version](https://badge.fury.io/js/arisa-react-generator.png)](https://badge.fury.io/js/arisa-react-generator)
> A simple react component generator

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Todo](#todo)
- [Contribute](#contribute)
- [License](#license)

## Install

```bash
$ npm install -g arisa-react-generator
```

## Usage

Generate templates file to current working diretory.
```bash
$ arisa-react-generator templates
```
After that, you can generate react component like this.
```
$ arisa-react-generator
? What's component name? MyComponent
? Stateless or Statefull? Statefull
? Support redux connect? Yes
? Which diretory do you want to export? ./test/components/
? Are you sure to generate component? Yes
test/components/MyComponent.js created.
```

**test/components/MyComponent.js**
```js
// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { MapStateToProps } from 'react-redux';

type Props = {
};

type State = {
};

class MyComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  props: Props;

  render() {
    <div>
      Statefull component
    </div>
  }
}

type OwnProps = {

};

const mapStateToProps: MapStateToProps<*, *, *> = (state: *, ownProps: OwnProps) => {

};

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
```

You can customize templates files that is written by [hogan.js](http://twitter.github.io/hogan.js/).

## Todo

- [ ] Support more flexisible inquirer paramaters.

## Contribute

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2018 ichiwa
