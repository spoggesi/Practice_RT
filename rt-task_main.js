
/* Change 1: Adding the image hosting site */
// define the site that hosts stimuli images
// usually https://<your-github-username>.github.io/<your-experiment-name>/
var repo_site = "https://spoggesi.github.io/Practice_RT/"; 

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
                "<p>You will see words appear quickly on-screen. Respond <strong>YES</strong> by using the <strong>J</strong> key or <strong>NO</strong> using the <strong>F</strong> key to whether these words can be associated with <strong>WEATHER TERMS</strong>.</p>" +
                "<p>Please place your fingers over the F and J keys ready to make your choices.</p>" +
                "<p>Press any key to begin.</p>",
    post_trial_gap: 2000
};
timeline.push(instructions);

/* test trials */

var test_stimuli = [{
        stimulus: '<div style="font-size:60px;">hot</div>', 
        data: {
            test_part: 'hot', 
            correct_response: 'j'
        }
    },
    {
        stimulus: '<div style="font-size:60px;">cold</div>',
        data: {
            test_part: 'cold', 
            correct_response: 'j'
        }
    },
    {
        stimulus: '<div style="font-size:60px;">teeth</div>',
        data: {
            test_part: 'teeth', 
            correct_response: 'f'
        }
    },
    {
        stimulus: '<div style="font-size:60px;">face</div>',
        data: {
            test_part: 'face', 
            correct_response: 'f'
        }
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
    prompt: '<div class = "leftBoxes><p> NO </p></div> <div class = "rightBoxes"><p> YES </p></div>
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
            test_part: 'hot'
        });
        var cold = jsPsych.data.get().filter({
            test_part: 'cold'
        });
        var teeth = jsPsych.data.get().filter({
            test_part: 'teeth'
        });
        var face = jsPsych.data.get().filter({
            test_part: 'face'
        });
        var rt_hot = Math.round(hot.select('rt').mean());
        var rt_cold = Math.round(cold.select('rt').mean());
        var rt_teeth = Math.round(teeth.select('rt').mean());
        var rt_face = Math.round(face.select('rt').mean());

        return "<p>hot " + rt_hot + "ms.</p>" +
            "<p>cold " + rt_cold + "ms.</p>" +
            "<p>Press any key to complete the experiment. Thank you!</p>";

    }
};
timeline.push(debrief_block);
