(function($){
// class: $.jqplot.MarkerRenderer
    // The default jqPlot marker renderer, rendering the points on the line.
    $.jqplot.ScatterMarkerRenderer = function(options){
        // Group: Properties
        // prop: show
        // wether or not to show the marker.
        this.show = true;
        // prop: style
        // One of diamond, circle, square, x, plus, dash, filledDiamond, filledCircle, filledSquare
        this.style = 'scatter';
        // prop: size
        // Size of the marker (diameter or circle, length of edge of square, etc.)
        this.defaultSize = 0.3;
        this.size = [];
        this.allowZero = false;
        this.sizeMultiplier = 10;
        this.printSize = true;
        
        // prop: color
        // color of marker.  Will be set to color of series by default on init.
        this.color = '#666666';
        // prop: shapeRenderer
        // Renderer that will draw the marker.
        this.shapeRenderer = new $.jqplot.ShapeRenderer();
        
        $.extend(true, this, options);
    };
    
    $.jqplot.ScatterMarkerRenderer.prototype.init = function(options) {
        $.extend(true, this, options);
  
        var shopt = {fill:false, isarc:false, strokeStyle:this.color, fillStyle:this.color, lineWidth:this.lineWidth, closePath:true};
        shopt.fill = true;
        shopt.closePath = false;
        shopt.isarc = true;
        this.shapeRenderer.init(shopt);
    };
    
    $.jqplot.ScatterMarkerRenderer.prototype.drawScatter = function(point, x, y, ctx, fill, options) {
    	
    	if (this.size[point] == 0)
    	{
    		var radius = (this.allowZero == true)? 0 : this.defaultSize / 2;
    	} else if (this.size[point] > 0) {
    		var radius = this.size[point] / 2;
    	} else {
    		var radius = this.defaultSize / 2;
    	}
    	
    	radius = radius * this.sizeMultiplier;
    	    	
        var end = 2*Math.PI;
        var points = [x, y, radius, 0, end, true];
        
        if (this.shadow) {
            this.shadowRenderer.draw(ctx, points);
        }
        this.shapeRenderer.draw(ctx, points, options);
        
        if (this.printSize == true)
        {
        	ctx.textAlign = "center";
        	ctx.textBaseline = "middle";
        	ctx.font = "12px sans-serif";
        	ctx.fillText(this.size[point],x,y);
        	
        }
        
        ctx.restore();
    };
    
    $.jqplot.CustomMarkerRenderer.prototype.draw = function(point, x, y, ctx, options) {
        options = options || {};
        switch (this.style) {

            case 'scatter':
                this.drawScatter(point,x,y,ctx,true,options);
                break;
            default:
                throw "Only scatter style may be used"
                break;
        }
    };
})(jQuery);