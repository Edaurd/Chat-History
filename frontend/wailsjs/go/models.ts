export namespace main {
	
	export class User {
	    index: number;
	    name: string;
	    figure: string;
	    gender: string;
	    custom: string;
	    x: number;
	    y: number;
	    z: number;
	    poolFigure: string;
	    badgeCode: string;
	    type: number;
	
	    static createFrom(source: any = {}) {
	        return new User(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.index = source["index"];
	        this.name = source["name"];
	        this.figure = source["figure"];
	        this.gender = source["gender"];
	        this.custom = source["custom"];
	        this.x = source["x"];
	        this.y = source["y"];
	        this.z = source["z"];
	        this.poolFigure = source["poolFigure"];
	        this.badgeCode = source["badgeCode"];
	        this.type = source["type"];
	    }
	}
	export class Message {
	    user: User;
	    message: string;
	    messageType: number;
	    color: string;
	
	    static createFrom(source: any = {}) {
	        return new Message(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.user = this.convertValues(source["user"], User);
	        this.message = source["message"];
	        this.messageType = source["messageType"];
	        this.color = source["color"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

