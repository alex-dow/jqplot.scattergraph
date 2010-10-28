(function($){
	
	$.jqplot.ScatterLineRenderer = function(){
		$.jqplot.LineRenderer.call(this);
	};
	
	$.jqplot.ScatterLineRenderer.prototype = new $.jqplot.LineRenderer();
	$.jqplot.ScatterLineRenderer.prototype.constructor = $.jqplot.ScatterLineRenderer;
	
    $.jqplot.ScatterLineRenderer.prototype.draw = function(ctx, gd, options) {
        var i;
        var opts = (options != undefined) ? options : {};
        var shadow = (opts.shadow != undefined) ? opts.shadow : this.shadow;
        var showLine = (opts.showLine != undefined) ? opts.showLine : this.showLine;
        var fill = (opts.fill != undefined) ? opts.fill : this.fill;
        var fillAndStroke = (opts.fillAndStroke != undefined) ? opts.fillAndStroke : this.fillAndStroke;
        ctx.save();
        if (gd.length) {
            // now draw the markers
            if (this.markerRenderer.show && !fill) {
                for (i=0; i<gd.length; i++) {
                    this.markerRenderer.draw(i, gd[i][0], gd[i][1], ctx, opts.markerOptions);
                }
            }
        }
        
        ctx.restore();
    };
})(jQuery);