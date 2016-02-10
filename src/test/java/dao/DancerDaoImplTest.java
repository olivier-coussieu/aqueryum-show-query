package dao;

import java.util.ArrayList;
import java.util.Collection;

import org.junit.Test;

import static org.junit.Assert.*;

import aqueryum.FilterFactory;
import aqueryum.incoming.Criterion;
import aqueryum.incoming.Operator;
import aqueryum.incoming.Ordering;
import aqueryum.incoming.Prescriptions;

public class DancerDaoImplTest {
	private static final Criterion BLOND_CRIT 		= new Criterion("hair_Color", Operator.eq, "blond");
	private static final Criterion BEAUTY_SPOT_CRIT = new Criterion("specialSign_type", Operator.eq, "beauty_spot");
	private static final Criterion CHEEK_CRIT 		= new Criterion("specialSign_location", Operator.eq, "cheek");
	private static final Criterion VIOLET_CRIT 		= new Criterion("garter_Color", Operator.eq, "purple");

	DancerDaoImpl sut = new DancerDaoImpl();
	
	@Test
	public void testNumero1() {
		Prescriptions BLOND 	= buildPrescriptions(BLOND_CRIT);
	   	String expected = "SELECT dancer.name FROM Dancer dancer"
	   					+ " WHERE dancer.hairColor = 'blond'"; 
		String obtained = "SELECT dancer.name FROM Dancer dancer" 
						+ sut.getQueryString(BLOND);    
		assertNotNull	("sut.getQueryString(BLOND) NULL", obtained);
		assertEquals	("sut.getQueryString(BLOND) KO", expected, obtained);
	}
	
	@Test
	public void testNumero2() {
		Prescriptions VIOLET_BLOND 	= buildPrescriptions(BLOND_CRIT, VIOLET_CRIT);
	   	String expected = "SELECT dancer.name FROM Dancer dancer, Garter garter"
	   					+ " WHERE dancer.hairColor = 'blond'"
	   					+ " AND garter.color = 'purple'"
	   					+ " AND garter.owner = dancer.id"
	   					; 
		String obtained = "SELECT dancer.name FROM Dancer dancer" 
						+ sut.getQueryString(VIOLET_BLOND);    
		assertNotNull	("sut.getQueryString(VIOLET_BLOND) NULL", obtained);
		assertEquals	("sut.getQueryString(VIOLET_BLOND) KO", expected, obtained);
	}
	
	@Test
	public void testNumero3() {
		Prescriptions BEAUTY_SPOT_VIOLET_BLOND 	= buildPrescriptions(BLOND_CRIT, VIOLET_CRIT, BEAUTY_SPOT_CRIT, CHEEK_CRIT);
	   	String expected = "SELECT dancer.name FROM Dancer dancer, SpecialSign specialSign, Garter garter"
					+ " WHERE dancer.hairColor = 'blond'"
					+ " AND garter.color = 'purple'"
					+ " AND specialSign.type = 'beauty_spot'"
					+ " AND specialSign.location = 'cheek'"
					+ " AND specialSign.owner = dancer.id"
					+ " AND garter.owner = dancer.id"
					; 
		String obtained = "SELECT dancer.name FROM Dancer dancer" 
						+ sut.getQueryString(BEAUTY_SPOT_VIOLET_BLOND);    
		assertNotNull	("sut.getQueryString(BEAUTY_SPOT_VIOLET_BLOND) NULL", obtained);
		assertEquals	("sut.getQueryString(BEAUTY_SPOT_VIOLET_BLOND) KO", expected, obtained);
	}

	protected Prescriptions buildPrescriptions(Criterion... criterions) {
		Collection<FilterFactory>  filterFactories = new ArrayList<FilterFactory>();
        for (Criterion criterion : criterions) {
    		filterFactories.add(criterion);
        }
 		return new Prescriptions(filterFactories, new ArrayList<Ordering>());
	}
}
