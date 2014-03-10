# Synth

A small wrapper for the Web Audio API, supports webkit

## Example

```javascript
var synth = new Synth();
synth.init();

var osc1 = synth.Oscillator(0);             // sine
var filter1 = synth.Filter(1, 512);         // highpass, frequency 512
var gain1 = synth.Gain(-0.5);               // gain node, gain -50%
osc1 = synth.route([osc1, filter1, gain1]); // set up routing

osc1.noteOn(0);                             // play that funky tone!
```

## License

MIT
