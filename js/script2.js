  // Training model using TensorFlow 
   // Step 1: Prepare Data
   const xs = tf.tensor1d([0, 1, 2]);   //Test 3: white and black [unsuccessful] Test 4: Roman Numeral Converter values[unsuccessful]
   const ys = tf.tensor1d([25, 27, 31]);    //Test1 Label(y=2x)[successful], Test2 Label(y=3x) [successful], Test3 Label(hexCode for complementary colors)
   //Result from test 1 = (input: 1, result 2.0151596069335938)
   // Step 2: Define Model
   const model = tf.sequential();
   model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
   model.compile({
     optimizer: tf.train.sgd(0.1),
     loss: 'meanSquaredError',
   });


   /*Divide the hexadecimal number into individual digits.
Convert each digit to it's decimal value (so 0-9 stay the same, A is 10, B is 11, etc.)
Starting at the rightmost digit, multiply each value by 16^X power, where X is the distance from the rightmost digit (so the rightmost digit is 16^0, or 1, next is 16^1, or 16, next is 16^2, or 256, etc.)
Add all the values together.
*/


   let isTraining = false;

   // Step 3: Train Model
   async function trainModel() {
     if (isTraining) {
       console.log('Training is already in progress. Please wait.');
       return;
     }

     isTraining = true;
     console.log('Training started...');

     await model.fit(xs, ys, {
       epochs: 500,
       callbacks: {
         onEpochEnd: (epoch, logs) => {
           console.log(`Epoch ${epoch}: loss = ${logs.loss}`);
         },
       },
     });

     console.log('Training complete!');
     isTraining = false;
   }
// Step 4: Predict Function
async function predict(inputValue) {
    const inputTensor = tf.tensor1d([inputValue]); // Convert input to tensor
    const outputTensor = model.predict(inputTensor); // Make prediction
    const outputArray = await outputTensor.array(); // Convert tensor to array
    return outputArray[0]; // Return the predicted value
  }

  // Step 5: Handle Button Click
  document.getElementById('predict-button').addEventListener('click', async () => {
    const inputValue = parseInt(document.getElementById('input-value').innerText);
    if (isNaN(inputValue)) {
      alert('Please enter a valid number.');
      return;
    }

    const prediction = await predict(inputValue);
    document.getElementById('output').innerText = `Predicted value: ${prediction}`;
});

   // Step 4: Trigger Training with Button Click
   document.getElementById('train-button').addEventListener('click', trainModel);
//<-----------------Test 2 ----------------------->
/*
// ExampleB: Create synthetic data for a simple linear regression problem
//Step 1: Prepare the data
const xs = tf.tensor1d([1, 2, 3, 4]); // Input features
const ys = tf.tensor1d([2, 4, 6, 8]); // Labels (y = 2x)

//Step 2: Define a model using TensorFlow.js. For example, a simple linear regression model:
const model = tf.sequential();

// Add a single dense layer (fully connected layer)
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

// Compile the model
model.compile({
  optimizer: tf.train.sgd(0.1), // Stochastic Gradient Descent optimizer
  loss: 'meanSquaredError',     // Loss function
});

//Step 3: Train the model using your data:
function trainModel() {
    console.log('Training started...');
    model.fit(xs, ys, {
      epochs: 10,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(`Epoch ${epoch}: loss = ${logs.loss}`);
        },
      },
    }).then(() => {
      console.log('Training complete!');
    });
  }
  
  // Call the function
  trainModel();
//<----------------------------------Test 1---------------------->

//After training, use the model to make predictions:

  const testInput = tf.tensor1d([5]); // New input
const prediction = model.predict(testInput);
prediction.print(); // Output the prediction

//Save the trained model to the browser's local storage or download it for later use:

async function saveModel() {
    await model.save('localstorage://my-model'); // Save to local storage
    console.log('Model saved!');
  }
  
  saveModel();

  //Load a previously saved model:

  async function loadModel() {
    const loadedModel = await tf.loadLayersModel('localstorage://my-model');
    console.log('Model loaded!');
    return loadedModel;
  }
  
  loadModel().then(model => {
    const testInput = tf.tensor1d([5]);
    model.predict(testInput).print();
  });

  
  //Step 4: Make Predictions

  async function run() {
    await trainModel();
    const testInput = tf.tensor1d([5]);
    const prediction = model.predict(testInput);
    prediction.print();
  }

  run();
  */