'use client';
'use strict';

var React = require('react');

var button = "tele2-ui-kit__button";
var styles = {
	button: button
};

var Button = function (props) {
    return React.createElement("button", { className: styles.button }, props.children);
};

exports.Button = Button;
//# sourceMappingURL=index.cjs.map
