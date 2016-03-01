package web.resources;

import static javax.ws.rs.core.Response.Status.BAD_REQUEST;
import static javax.ws.rs.core.Response.Status.NOT_FOUND;
import static javax.ws.rs.core.Response.Status.OK;









import web.utils.SearchJsonDeserializer;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import aqueryum.FilterFactory;
import aqueryum.incoming.Prescriptions;
import aqueryum.translaters.JpqlPrescriptionsTranslater;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

@Path("dancer")
public class DancerResource {

	private static final JpqlPrescriptionsTranslater JPQL_PRESCRIPTIONS_TRANSLATER = new JpqlPrescriptionsTranslater(new DancersPathFinder.Factory());

	@GET
	@Produces("text/plain")
	public String hello() {
		return "it works";
	}
	
    @POST
	@Path("find")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public Response findList(String criteria) {
		if(criteria == null){
			return Response.status(BAD_REQUEST)
					       .entity("prescriptions cannot be null")
					       .type(MediaType.TEXT_PLAIN)
					       .build();
		}
		Gson gson = new GsonBuilder().registerTypeAdapter(FilterFactory.class, new SearchJsonDeserializer()).create();
		Prescriptions prescriptions = gson.fromJson(criteria, Prescriptions.class);
		String items =  "SELECT dancer.name FROM Dancer dancer" 
					+ JPQL_PRESCRIPTIONS_TRANSLATER.translate(prescriptions, true);    
		ResponseBuilder response = (items != null) ? Response.status(OK).entity(items) : Response.status(NOT_FOUND);
		return response.build();
	}

}
