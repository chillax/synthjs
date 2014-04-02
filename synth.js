/*
 * Synth lib
 */


var Synth = (function() {
    function Synth() {}

    var ctx; // We store audio context here

    Synth.prototype.init = function() {
        ctx = new webkitAudioContext();
        return ctx;
    }

    Synth.prototype.Oscillator = function(type) {
        var osc = ctx.createOscillator();
        osc.type = type;
        osc.connect(ctx.destination);
        return osc;
    }

    Synth.prototype.route = function(nodes) {
        for(var i = 0; i < nodes.length - 1; i++) {
			console.log(nodes[i], 'connected to', nodes[i+1]);
            nodes[i].connect(nodes[i+1]);
        }
        nodes[nodes.length - 1].connect(ctx.destination);
        return nodes[0];
    }

    Synth.prototype.Filter = function(type, value) {
        var filter = ctx.createBiquadFilter();
        filter.type = type;
        filter.frequency.value = value;
        return filter;
    }

    Synth.prototype.Gain = function(value) {
        var gain = ctx.createGain();
        gain.gain.value = value;
        return gain;
    };

	Synth.prototype.Analyser = function(min, max) {
		var analyser = ctx.createAnalyser();
		analyser.minDecibels = min;
		analyser.maxDecibels = max;
		
		analyser.draw = function(drawContext, canvasWidth, canvasHeight) {
		}

		return analyser;
	}
	
	Synth.prototype.draw = function(analyser, drawContext, canvasWidth, canvasHeight, canvas) {
		canvas.width = canvas.width;
		var freqs = new Uint8Array(analyser.frequencyBinCount);
		analyser.getByteTimeDomainData(freqs);

		for (var i = 0; i < analyser.frequencyBinCount; i++) {
			var value = freqs[i];
			var percent = value / 256;
			var height = canvasHeight * percent;
			var offset = canvasHeight - height - 1;
			var barWidth = canvasWidth/analyser.frequencyBinCount;
			drawContext.fillStyle = 'black';
			drawContext.fillRect(i * barWidth, offset, 1, 2);
		}

		requestAnimationFrame(this.draw.bind(this, analyser, drawContext, canvasWidth, canvasHeight, canvas));
	}

    Synth.prototype.LFO = function(target) {
        // TODO
        // Use AudioParam here
    }

    // TODO Envelope
    // http://stackoverflow.com/questions/12252396/web-audio-api-polyphony-using-2-different-gain-nodes-not-working

    // TODO Delay

    // TODO Reverb

    return Synth;
}());
