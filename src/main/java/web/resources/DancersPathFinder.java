package web.resources;

import aqueryum.Jointures;
import aqueryum.PathFinder;
import aqueryum.PathFinderFactory;
import aqueryum.ValueFormatter;
import aqueryum.translaters.JpqlJointures;


public enum DancersPathFinder implements PathFinder {

	hair_color			("dancer"	, "hairColor"	, " "						, " "),	
	specialSign_type	("specialSign"	, "type"	, ", SpecialSign specialSign", ""),	
	specialSign_location("specialSign"	, "location", ", SpecialSign specialSign", " AND specialSign.owner = dancer.id"),	
	garter_color		("garter"		, "color"	, ", Garter garter"			, " AND garter.owner = dancer.id");	

    public final String alias;
    public final String column;
    public final boolean isKey;
    public final ValueFormatter type;
    private final Jointures jointures = new JpqlJointures();


	private DancersPathFinder(String alias, String column, String entities, String join) {
		this(alias,  column, false, FMT_CHARSEQ);
		if (entities != null && !entities.equalsIgnoreCase("")) {
			this.jointures.getEntities().add(entities);
			this.jointures.getFilters().add(join); 
		}
	}

	private DancersPathFinder(String alias, String column, boolean isKey, ValueFormatter type) {
		this.alias = alias;
		this.column = column;
		this.isKey = isKey;
		this.type = type;
	}

	public ValueFormatter getValueFormatter() {		return type;	}

	public String getAliasAndField() {
    	return this.alias + (this.isKey ? ".id." : ".") + this.column;
	}

	public Jointures getJointures() {
		return jointures;
	}

	public static DancersPathFinder fromString(String name) {
		DancersPathFinder f = null;
        for (DancersPathFinder v : values()) {
            if (v.name().equalsIgnoreCase(name) || v.column.equalsIgnoreCase(name)) {
                f = v;
                break;
            }
        }
		return f;
	}
	
    public final static class Factory implements PathFinderFactory {

		public PathFinder getPathFinder(String name) {
			DancersPathFinder f = DancersPathFinder.fromString(name);
            if (f == null) {
                throw new IllegalArgumentException(name);
            }
            return f;
		}
    }
}
