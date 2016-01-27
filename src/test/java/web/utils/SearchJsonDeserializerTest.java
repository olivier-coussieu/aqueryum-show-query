package web.utils;

import java.util.ArrayList;
import java.util.List;

import org.junit.BeforeClass;
import org.junit.Test;

import static org.junit.Assert.*;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import aqueryum.FilterFactory;
import aqueryum.incoming.Ordering;
import aqueryum.incoming.Prescriptions;
import aqueryum.incoming.Criterion;
import aqueryum.incoming.Operator;

public class SearchJsonDeserializerTest {

	private static final Criterion 				HAIR_BLONDE 	= new Criterion("hair_color", Operator.eq, "blonde");
	private static final List<Ordering> 		ORDERING_LIST 	= new ArrayList<Ordering>();
	private static final Gson 					GSON 			= new GsonBuilder().registerTypeAdapter(FilterFactory.class, new SearchJsonDeserializer()).create();

	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
	}

	private final List<FilterFactory> searchingList 	= new ArrayList<FilterFactory>();
	private String criteria;

	@Test
	public void hairBlonde() {
		searchingList.add(HAIR_BLONDE);
		Prescriptions expected 	= new Prescriptions(searchingList, ORDERING_LIST);
		expected.setClause(null);  // ???
		criteria = "{criteria: [{field: 'hair_color', op: 'eq', value: 'blonde'}], orderings:[]}";
		Prescriptions obtained 	= GSON.fromJson(criteria, Prescriptions.class);
		assertNotNull			("GSON.fromJson(criteria, Prescriptions.class) NULL", obtained);
		assertEquals			("GSON.fromJson(criteria, Prescriptions.class) KO", expected, obtained);
	}

}
