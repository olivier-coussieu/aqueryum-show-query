package dao;

import java.util.HashSet;
import java.util.Set;

import aqueryum.FilterFactory;
import aqueryum.incoming.Criterion;
import aqueryum.incoming.Prescriptions;



public class DancerDaoImpl {

	public String getQueryString(Prescriptions prescriptions) {
		StringBuilder filters = new StringBuilder();
		Set<String> joinFilters =  new HashSet<String>() ;
		Set<String> joinEntities =  new HashSet<String>() ;
		String clause = "";
		for (FilterFactory filterFactory : prescriptions.getCriteria()) {
			Criterion criterion = (Criterion) filterFactory;
			Selector selector = getSelector(criterion.getField());
			joinEntities.addAll(selector.getJoinEntities());
			joinFilters.addAll (selector.getJoinFilters()); 
			filters.append(clause).append(selector.getFilter()).append(criterion.getValue()).append("'");
			clause = Prescriptions.AND_CLAUSE;
		}
		
		StringBuilder qsb = new StringBuilder(concatene(joinEntities));
		qsb.append(" WHERE ")
		   .append(filters)
		   .append(concatene(joinFilters));
		return qsb.toString();
		
	}

	protected Selector getSelector(final String field) {
		Selector selector = null;
		switch (field) 
		{
		case "hair_Color": { 
			return new Selector("dancer.hairColor = '", "", "");
			}
		case "specialSign_type": { 
			return new Selector("specialSign.type = '", ", SpecialSign specialSign", " AND specialSign.owner = dancer.id");
			}
		case "specialSign_location": { 
			return new Selector("specialSign.location = '", ", SpecialSign specialSign", " AND specialSign.owner = dancer.id");
			}
		case "garter_Color": { 
			return new Selector("garter.color = '", ", Garter garter", " AND garter.owner = dancer.id");
			}
		}
		return selector;
	}

	protected String concatene(Set<String> maillons) {
		StringBuilder chaine = new StringBuilder();
		for (String maillon : maillons) {
		    chaine.append(maillon);
		}
		return chaine.toString();
	}
}
