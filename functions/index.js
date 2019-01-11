'use strict';


const functions = require('firebase-functions');
const admin = require('firebase-admin');
const vision = require('@google-cloud/vision');
const visionClient =  new vision.ImageAnnotatorClient();
let Promise = require('promise');
const cors = require('cors')({ origin: true });
const request = require('request');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const Storage = require('@google-cloud/storage');



exports.addSimilarImages = functions.firestore.document('photos/{document}')
.onCreate((snap, context) => {

	const data = snap.data();
	const photoUrl = "gs://" + data.bucket + "/" + data.fullPath;

	return Promise.resolve()
	.then(() => {
		return visionClient.webDetection(photoUrl);
	})
	.then(results => {
		console.log('VISION data all is: ', results)
		const webDetection = results[0].webDetection

		let similarImages = [];
		if (webDetection.visuallySimilarImages.length) {
			webDetection.visuallySimilarImages.forEach(image => {
				similarImages.push(image);
			});
		}

		console.log('similarImages', similarImages)

		db.collection('photos').doc(context.params.document).update({ similarImages })
		.then(res => console.log('dopples added'))
		.catch(err => console.error(err));


	})
	.catch(err => console.error(err));

})

exports.processImage = functions.firestore.document('photos/{document}')
.onCreate((snap, context) => {
	let text;
	const data = snap.data();
	const photoUrl = "gs://" + data.bucket + "/" + data.fullPath;
	return Promise.resolve()
	.then(() => {
		return visionClient.textDetection(photoUrl);
	})
	.then(([detections]) => {
		const annotation = detections.textAnnotations[0];
		text = annotation ? annotation.description : '';

		db.collection('photos').doc(context.params.document).update({ text })
		console.log(`Extracted text: ${text}`);
		console.log(`Extracted text from image (${text.length} chars)`);
	}).catch(vis_err => {
		console.error("Vision error:" , vis_err);
	});
	res.status(200).send("OK");
})
