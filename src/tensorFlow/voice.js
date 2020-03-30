// more documentation available at
// https://github.com/tensorflow/tfjs-models/tree/master/speech-commands
import * as speechCommands from "@tensorflow-models/speech-commands";
import { useDispatch } from "react-redux";

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/ByTuhHUK0/";
const proxyurl = "https://cors-anywhere.herokuapp.com/";
async function createModel() {
  const checkpointURL = proxyurl + URL + "model.json"; // model topology
  const metadataURL = proxyurl + URL + "metadata.json"; // model metadata

  const recognizer = speechCommands.create(
    "BROWSER_FFT", // fourier transform type, not useful to change
    undefined, // speech commands vocabulary feature, not useful for your models
    checkpointURL,
    metadataURL
  );

  // check that model and metadata are loaded via HTTPS requests.
  await recognizer.ensureModelLoaded();

  return recognizer;
}

export default async function Init(setLoad) {
  const dispatch = useDispatch();
  
  const recognizer = await createModel();
  setLoad(true)
  const classLabels = recognizer.wordLabels(); // get class labels

  // listen() takes two arguments:
  // 1. A callback function that is invoked anytime a word is recognized.
  // 2. A configuration object with adjustable fields
  recognizer.listen(
    result => {
      const index = result.scores.reduce(
        (iMax, x, i, arr) => (x > arr[iMax] ? i : iMax),
        0
      );

      //   console.log(classLabels[index]);
      dispatch({ type: "SET_VOICE", payload: classLabels[index] });
      console.log(classLabels[index]);

    },
    {
      includeSpectrogram: true, // in case listen should return result.spectrogram
      probabilityThreshold: 0.60,
      invokeCallbackOnNoiseAndUnknown: true,
      overlapFactor: 0.75 // probably want between 0.5 and 0.75. More info in README
    }
  );

  // Stop the recognition in 5 seconds.
  // setTimeout(() => recognizer.stopListening(), 5000);
}
