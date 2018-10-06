import React from 'react';

class AlertManager extends React.Component {
	static setSocket(alert) {
		this.alert = alert;
	}
	static show(msg) {
		this.alert.info(msg);
	}
}
export default AlertManager;