package web.resources;

import java.util.ArrayList;
import java.util.Collection;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import web.resources.DancersPathFinder.Factory;

import static org.junit.Assert.*;

import aqueryum.FilterFactory;
import aqueryum.incoming.Criterion;
import aqueryum.incoming.Operator;
import aqueryum.incoming.Ordering;
import aqueryum.incoming.Prescriptions;
import aqueryum.translaters.JpqlPrescriptionsTranslater;

public class DancersPathFinderTest {

	private static final Factory FACTORY = new DancersPathFinder.Factory();
	private static final Criterion FRECKLES_CRIT = new Criterion("specialSign_type", Operator.eq, "freckles");
	private static final Criterion CENSORED_CRIT = new Criterion("specialSign_location", Operator.eq, "censored");

	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
	}

	@Before
	public void setUp() throws Exception {
	}
	JpqlPrescriptionsTranslater sut = new JpqlPrescriptionsTranslater(FACTORY);

	@Test
	public void censored() {
		Prescriptions CENSORED 	= buildPrescriptions(CENSORED_CRIT);
	   	String expected = "SELECT dancer.name FROM Dancer dancer, SpecialSign specialSign"
	   			+ " WHERE specialSign.location = 'censored' AND specialSign.owner = dancer.id"; 
		String obtained = "SELECT dancer.name FROM Dancer dancer" 
						+ sut.translate(CENSORED, true);    
		assertNotNull	("sut.translate(CENSORED) NULL", obtained);
		assertEquals	("sut.translate(CENSORED) KO", expected, obtained);
	}

	@Test
	public void freckles() {
		Prescriptions FRECKLES 	= buildPrescriptions(FRECKLES_CRIT);
	   	String expected = "SELECT dancer.name FROM Dancer dancer, SpecialSign specialSign"
	   			+ " WHERE specialSign.type = 'freckles' AND specialSign.owner = dancer.id"; 
		String obtained = "SELECT dancer.name FROM Dancer dancer" 
						+ sut.translate(FRECKLES, true);    
		assertNotNull	("sut.translate(FRECKLES) NULL", obtained);
		assertEquals	("sut.translate(FRECKLES) KO", expected, obtained);
	}

	@Test
	public void both() {
		Prescriptions BOTH 	= buildPrescriptions(FRECKLES_CRIT, CENSORED_CRIT);
	   	String expected = "SELECT dancer.name FROM Dancer dancer, SpecialSign specialSign"
	   			+ " WHERE specialSign.type = 'freckles' AND specialSign.location = 'censored' AND specialSign.owner = dancer.id"; 
		String obtained = "SELECT dancer.name FROM Dancer dancer" 
						+ sut.translate(BOTH, true);    
		assertNotNull	("sut.translate(BOTH) NULL", obtained);
		assertEquals	("sut.translate(BOTH) KO", expected, obtained);
	}

	@Test
	public void analyse() {
		Prescriptions BOTH 	= buildPrescriptions(FRECKLES_CRIT, CENSORED_CRIT);
	   	String expected = "specialSign.type = 'freckles' AND specialSign.location = 'censored'"; 
		String obtained = BOTH.filters(FACTORY);    
		assertNotNull	("BOTH.filters(FACTORY) NULL", obtained);
		assertEquals	("BOTH.filters(FACTORY) KO", expected, obtained);
	}

	protected Prescriptions buildPrescriptions(Criterion... criterions) {
		Collection<FilterFactory>  filterFactories = new ArrayList<FilterFactory>();
        for (Criterion criterion : criterions) {
    		filterFactories.add(criterion);
        }
 		return new Prescriptions(filterFactories, new ArrayList<Ordering>());
	}

}
