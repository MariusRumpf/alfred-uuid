'use strict';

const alfy = require('alfy');
const {v1: uuidv1} = require('uuid');
const {v4: uuidv4} = require('uuid');

const output = [];

function addAutocompleteOutput(title, subtitle, autocomplete) {
	output.push({
		title,
		subtitle,
		autocomplete,
		valid: false
	});
}

function addUuidOutput(uuid, version) {
	output.push({
		title: uuid,
		subtitle: `UUID${version}, Actions:  ⏎ to copy`,
		arg: uuid,
		text: {
			copy: uuid,
			largetype: uuid
		},
		variables: {
			action: 'copy'
		}
	});
}

function genUuids(generator, version, count = 4) {
	for (let i = 0; i < count; i += 1) {
		const uuid = generator();
		addUuidOutput(uuid, version);
	}
}

if (alfy.input.toLowerCase() === 'v1') {
	genUuids(uuidv1, 'v1');
} else if (alfy.input.toLowerCase() === 'v4') {
	genUuids(uuidv4, 'v4');
} else {
	addAutocompleteOutput(`${process.env.keyword} v4`, 'Generate v4 UUIDs', 'v4');
	addAutocompleteOutput(`${process.env.keyword} v1`, 'Generate v1 UUIDs', 'v1');
}

alfy.output(output);
