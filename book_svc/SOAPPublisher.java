package com.journaldev.jaxws.service;

import javax.xml.ws.Endpoint;

public class SOAPPublisher {

	public static void main(String[] args) {
		 Endpoint.publish("http://localhost:8888/ws/probook", new BookServiceImpl());
	}

}

// Javac -d . Book.java BookService.java BookServiceImpl.java SOAPPublisher.java
// java -classpath . com.journaldev.jaxws.service.SOAPPublisher
