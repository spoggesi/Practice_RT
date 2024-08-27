
/* Change 1: Adding the image hosting site */
// define the site that hosts stimuli images
// usually https://<your-github-username>.github.io/<your-experiment-name>/
var repo_site = "https://spoggesi.github.io/Qualtrics-test/"; 

/* create timeline */
var timeline = [];

/* define welcome message trial */
var welcome_block = {
    type: "html-keyboard-response",
    stimulus: "Welcome to the experiment. Press any key to begin."
};
timeline.push(welcome_block);

/* define instructions trial */
var instructions = {
    type: "html-keyboard-response",
    stimulus: "<p>You will now carry out a fast response task. Please answer as <strong>QUICKLY</strong> as you can.</p>" +
                "<p>To get you ready for this you will do a few practice trials.</p>" +
                "<p>You will see words appear quickly on-screen. Respond yes by using the J key or no using the F key to whether these words can be associated with WEATHER TERMS.</p>" +
                "<p>Please place your fingers over the F and J keys ready to make your choices.</p>" +
                "<p>Press any key to begin.</p>",
    post_trial_gap: 2000
};
timeline.push(instructions);

/* test trials */

var test_stimuli = [{
        stimulus: '<div style="font-size:60px;">Hot</div>',
        data: {test_part: 'Hot', correct_response: 'j'}
    },
    {
        stimulus: '<div style="font-size:60px;">Cold</div>',
        data: {test_part: 'Cold', correct_response: 'j'}
    },
    {
        stimulus: '<div style="font-size:60px;">Teeth</div>',
        data: {test_part: 'Teeth', correct_response: 'j'}
    },
    {
        stimulus: '<div style="font-size:60px;">Face</div>',
        data: {test_part: 'Face', correct_response: 'j'}
    }
];

var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: function () {
        return jsPsych.randomization.sampleWithoutReplacement([1000], 1)[0];
    },
    data: {
        test_part: 'fixation'
    }
}

var test = {
    type: "html-keyboard-response",
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: ['f', 'j'],
    data: jsPsych.timelineVariable('data'),
    on_finish: function (data) {
        data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
    },
}

var test_procedure = {
    timeline: [fixation, test],
    timeline_variables: test_stimuli,
    repetitions: 3,
    randomize_order: true
}
timeline.push(test_procedure);

/* define debrief */

var debrief_block = {
    type: "html-keyboard-response",
    stimulus: function () {
        var hot = jsPsych.data.get().filter({
            test_part: 'Hot'
        });
        var cold = jsPsych.data.get().filter({
            test_part: 'Cold'
        });
        var teeth = jsPsych.data.get().filter({
            test_part: 'Teeth'
        });
        var face = jsPsych.data.get().filter({
            test_part: 'Face'
        });
        var rt_hot = Math.round(hot.select('rt').mean());
        var rt_cold = Math.round(cold.select('rt').mean());
        var rt_teeth = Math.round(teeth.select('rt').mean());
        var rt_face = Math.round(face.select('rt').mean());

        return "<p>energetic " + rt_energetic + "ms.</p>" +
            "<p>indulgent " + rt_indulgent + "ms.</p>" +
            "<p>Press any key to complete the experiment. Thank you!</p>";

    }
};
timeline.push(debrief_block);