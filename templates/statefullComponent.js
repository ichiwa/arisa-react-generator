// @flow
import React from 'react';
{{#reduxConnect}}
import { connect } from 'react-redux';
import type { MapStateToProps } from 'react-redux';
{{/reduxConnect}}

type Props = {
};

type State = {
};

class {{componentName}} extends React.Component<Props, State> {
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
{{#reduxConnect}}

type OwnProps = {

};

const mapStateToProps: MapStateToProps<*, *, *> = (state: *, ownProps: OwnProps) => {

};

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)({{componentName}});
{{/reduxConnect}}
{{^reduxConnect}}
export default {{componentName}};
{{/reduxConnect}}
