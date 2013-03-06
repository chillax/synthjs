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
        var gain = ctx.createGainNode();
        gain.gain.value = value;
        return gain;
    };

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
