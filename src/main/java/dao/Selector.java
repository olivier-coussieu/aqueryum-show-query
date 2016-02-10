package dao;

import java.util.HashSet;
import java.util.Set;

public class Selector {
	private final String filter;
	private final Set<String> joinEntities =  new HashSet<String>() ;
	private final Set<String> joinFilters =  new HashSet<String>() ;

	public Selector(String filter, String joinEntities, String joinFilters) {
		this.filter = filter;
		this.joinEntities.add(joinEntities); 
		this.joinFilters.add(joinFilters); 
	}

	public String getFilter() {
		return filter;
	}

	public Set<String> getJoinEntities() {
		return joinEntities;
	}

	public Set<String> getJoinFilters() {
		return joinFilters;
	}
}
