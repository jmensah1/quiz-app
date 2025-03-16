import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Segment,
  Item,
  Dropdown,
  Divider,
  Button,
  Message,
} from 'semantic-ui-react';

import mindImg from '../../images/mind.svg';

import {
  CATEGORIES,
  NUM_OF_QUESTIONS,
  COUNTDOWN_TIME,
} from '../../constants';
import { shuffle } from '../../utils';

import localQuestions from './questions.json'; // Import the local JSON file

const Main = ({ startQuiz }) => {
  const [category, setCategory] = useState('0');
  const [numOfQuestions, setNumOfQuestions] = useState(10);
  const [countdownTime, setCountdownTime] = useState({
    hours: 0,
    minutes: 240,
    seconds: 0,
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleTimeChange = (e, { name, value }) => {
    setCountdownTime({ ...countdownTime, [name]: value });
  };

  let allFieldsSelected = false;
  if (
    category &&
    numOfQuestions &&
    (countdownTime.hours || countdownTime.minutes || countdownTime.seconds)
  ) {
    allFieldsSelected = true;
  }

  const fetchData = () => {
    setProcessing(true);

    if (error) setError(null);

    // Use local JSON data instead of API call
    setTimeout(() => {
      const { response_code, results } = localQuestions;

      if (response_code === 1) {
        const message = (
          <p>
            The API doesn't have enough questions for your query. (Ex.
            Asking for 50 Questions in a Category that only has 20.)
            <br />
            <br />
            Please change the <strong>No. of Questions</strong>.
          </p>
        );

        setProcessing(false);
        setError({ message });

        return;
      }

      console.log('Selected Category:', category);

      // Filter questions based on selected category
      const filteredQuestions = results.filter(
        question => category === '0' || question.category === category
      );

      console.log('Filtered Questions:', filteredQuestions);

      if (filteredQuestions.length === 0) {
        setProcessing(false);
        setError({ message: 'No questions available for the selected category.' });
        return;
      }

      // Shuffle and limit the number of questions
      const selectedQuestions = shuffle(filteredQuestions).slice(0, numOfQuestions);

      selectedQuestions.forEach(element => {
        element.options = shuffle([
          element.correct_answer,
          ...element.incorrect_answers,
        ]);
      });

      console.log('Selected Questions:', selectedQuestions);

      setProcessing(false);
      startQuiz(
        selectedQuestions,
        countdownTime.hours + countdownTime.minutes + countdownTime.seconds
      );
    }, 1000);
  };

  return (
    <Container>
      <Segment>
        <Item.Group divided>
          <Item>
            <Item.Image src={mindImg} />
            <Item.Content>
              <Item.Header>
                <h1>IT 1- Evening Revision App</h1>
              </Item.Header>
              {error && (
                <Message error onDismiss={() => setError(null)}>
                  <Message.Header>Error!</Message.Header>
                  {error.message}
                </Message>
              )}
              <Divider />
              <Item.Meta>
                <p>In which category do you want to play the quiz?</p>
                <Dropdown
                  fluid
                  selection
                  name="category"
                  placeholder="Select Quiz Category"
                  header="Select Quiz Category"
                  options={CATEGORIES}
                  value={category}
                  onChange={(e, { value }) => setCategory(value)}
                  disabled={processing}
                />
                <br />
                <p>How many questions do you want in your quiz?</p>
                <Dropdown
                  fluid
                  selection
                  name="numOfQ"
                  placeholder="Select No. of Questions"
                  header="Select No. of Questions"
                  options={NUM_OF_QUESTIONS}
                  value={numOfQuestions}
                  onChange={(e, { value }) => setNumOfQuestions(value)}
                  disabled={processing}
                />
                <br />
                <p>Please select the countdown time for your quiz.</p>
                <Dropdown
                  search
                  selection
                  name="hours"
                  placeholder="Select Hours"
                  header="Select Hours"
                  options={COUNTDOWN_TIME.hours}
                  value={countdownTime.hours}
                  onChange={handleTimeChange}
                  disabled={processing}
                />
                <Dropdown
                  search
                  selection
                  name="minutes"
                  placeholder="Select Minutes"
                  header="Select Minutes"
                  options={COUNTDOWN_TIME.minutes}
                  value={countdownTime.minutes}
                  onChange={handleTimeChange}
                  disabled={processing}
                />
                <Dropdown
                  search
                  selection
                  name="seconds"
                  placeholder="Select Seconds"
                  header="Select Seconds"
                  options={COUNTDOWN_TIME.seconds}
                  value={countdownTime.seconds}
                  onChange={handleTimeChange}
                  disabled={processing}
                />
              </Item.Meta>
              <Divider />
              <Item.Extra>
                <Button
                  primary
                  size="big"
                  icon="play"
                  labelPosition="left"
                  content={processing ? 'Processing...' : 'Play Now'}
                  onClick={fetchData}
                  disabled={!allFieldsSelected || processing}
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <br />
    </Container>
  );
};

Main.propTypes = {
  startQuiz: PropTypes.func.isRequired,
};

export default Main;