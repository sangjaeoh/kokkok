package com.kokkok.comm;

import java.util.logging.Logger;

import org.aspectj.lang.ProceedingJoinPoint;


public class LogCheck {
	public static Logger logger = Logger.getLogger(LogCheck.class.getName());
	
	public static final String logMsg="LogMsg----------------";

	public Object advice(ProceedingJoinPoint joinPoint) {
		Object obj = null;
		
		try {
			logger.info(logMsg+joinPoint.getTarget().getClass().getName()+"\t\t"+
						joinPoint.getSignature().getName());
			
			obj = joinPoint.proceed();
			
		}catch(Throwable e){
			e.printStackTrace();
		}
		return obj;
	}
}
