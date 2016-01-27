package web.utils;

import java.lang.reflect.Type;


import aqueryum.FilterFactory;
import aqueryum.incoming.Criterion;
import aqueryum.incoming.Prescriptions;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;

public class SearchJsonDeserializer implements JsonDeserializer<FilterFactory> {
	
	@Override
    public FilterFactory deserialize	( JsonElement json
    									, Type typeOfT
    									, JsonDeserializationContext context
    									) throws JsonParseException {
        JsonObject 	jo 	= (JsonObject) json;
        String 		s 	= jo.has("type") ? jo.get("type").getAsString()  // first condition for molecule
        								 : "sc";					// Simple Condition = atom
        if ("ca".equals(s)){
        	return context.deserialize(json, Prescriptions.class);	// molecule
        } else { // type = 'co'
        	return context.deserialize(json, Criterion.class);		// atom
        }
    }
	
}
