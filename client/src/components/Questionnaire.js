import React, {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet';
import Textarea from 'react-textarea-autosize';
import {v4 as genId} from 'uuid';
import {getOrInitObject, createProposition, cleanData} from '../helpers/misc';

const defaultData = {
  id: genId(),
  email: undefined,
  propositions: []
}

// min text length for answers
// @todo put in config ?
const TEXT_LIMIT = 20;

export default function({
  translate,
  lang,
  eventListener
}) {
  // registering questionnaire questions
  const questions =  {
    'develop': [
      translate('to-develop-question-1'),
      translate('to-develop-question-2'),
      translate('to-develop-question-3'),
      translate('to-develop-question-4'),
      translate('to-develop-question-5'),
    ],
    'stop': [
      translate('to-stop-question-1'),
      translate('to-stop-question-2'),
      translate('to-stop-question-3'),
      translate('to-stop-question-4'),
    ]
  }
  /**
   * ==============
   * Initial values
   * ==============
   */
  const initialData = getOrInitObject('mayday/questionnaireData', defaultData);
  // questionnaire responses data
  const [data, setData] = useState(initialData);
  const initialStage = +getOrInitObject('mayday/questionnaireStage', 0);
  // index of the proposition being edited
  let initialIndex = +getOrInitObject('questionnaireIndex', 0);
  // prevent exceptions or issues with data
  if (!data || initialIndex > data.propositions.length  - 1) {
    initialIndex = 0;
  }
  /**
   * ==============
   * State definitions
   * ==============
   */
  // questionnaire stage
  // stage = state machine for the questionnaire views
  // "stage" values :
  // 0 = spash screen
  // 1-(n-1) = number of the active question
  // null = final screen (send your proposals);
  const [stage, setStage] = useState(initialStage);
  // index of the proposition being edited
  const [questionnaireIndex, setQuestionnaireIndex] = useState(initialIndex);
  // "review your answers" open/close state
  const [reviewVisible, setReviewVisible] = useState(false);
  // xhr status
  const [sendStatus, setSendStatus] = useState(undefined);
  /**
   * ==============
   * Localstorage savings
   * ==============
   */
  // save data in localstorage at each change
  // @todo could be debounced
  useEffect(() => {
    localStorage.setItem('mayday/questionnaireData', JSON.stringify(data));
  });
  
  // save stage to local storage
  useEffect(() => {
    localStorage.setItem('mayday/questionnaireStage', stage);
    if(stage === 0) {
      setData(cleanData(data))
      setReviewVisible(false);
    }
    // focusing on active textarea or input at each stage change
    setTimeout(() => {
      const el  = document.querySelector('textarea, input')
      if (el) {
        el.focus();
      }
    })
  }, [stage]);
  
  // save currently edited proposition index
  useEffect(() => {
    localStorage.setItem('mayday/questionnaireIndex', questionnaireIndex);
  }, [questionnaireIndex]);

  // trick to enable reseting stage if questionnaire is clicked in nav
  const handleEvent = function(type, payload) {
    if (type === 'questionnaireClick') {
      setStage(0);
    }
  }
  useEffect(() => {
    eventListener.addSubscriber(handleEvent)
  }, [eventListener])

  /**
   * ==========================
   * Temp variables
   * ==========================
   */
  // capture current proposition data
  const currentProposition = stage > 0 && questionnaireIndex < data.propositions.length && data.propositions[questionnaireIndex];
  const currentPropositionType = currentProposition && currentProposition.type === 'develop' ? 'develop': 'stop';
  
  const questionsLabels = questions[currentPropositionType];
  const numberOfQuestions = questionsLabels.length;

  let currentText;
  if (stage > 0 && stage < numberOfQuestions + 1) {
    currentText = data.propositions[questionnaireIndex] ? data.propositions[questionnaireIndex][`question${stage}`] : '';
  }
  const emailIsValid = data.email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email);

  /**
   * =========
   * Callbacks
   * =========
   */
  // add a new activity
  const handleAddActivity = type => {
    const proposition = createProposition(type, questions)
    const newData = {
      ...data,
      propositions: [
        ...data.propositions,
        proposition
      ]
    }
    setQuestionnaireIndex(data.propositions.length)
    setData(newData);
    setStage(1);
  }
  const handleStopActivity = () => handleAddActivity('stop', questions);
  const handleDevelopActivity = () => handleAddActivity('develop', questions);

  // go to next question
  const handleNextStage = () => {
    const nextStage = stage + 1;
    setStage(nextStage);
  }
  // go to previous question
  const handlePreviousStage = () => {
    const previousStage = stage - 1;
    setStage(previousStage);
  }
  // go to proposition choice
  const handleGoToSummary = () => {
    setStage(0);
    setQuestionnaireIndex(0);
  }
  // go to send choice
  const handleGoToFinal = () => {
    setQuestionnaireIndex(undefined);
    setStage(null);
    setReviewVisible(false);
  }
  // save current question text
  const handleSaveActiveText = (thatText) => {
    const newData = {
      ...data,
      propositions: data.propositions.map((prop, index) => {
        if (index === questionnaireIndex) {
          return {
            ...prop,
            [`question${stage}`]: thatText
          }
        }
        return prop;
      })
    }
    setData(newData)
  }
  // register active textarea change
  const handleActiveTextChange = (e) => {
    handleSaveActiveText(e.target.value);
  }
  // register email input change
  const handleEmailChange = (thatEvent) => {
    setData({
      ...data,
      email: thatEvent.target.value,
    })
  }
  // send questionnaire to API
  const handleSubmit = (e, withEmail) => {
    if (e) {
      e.preventDefault();
    }
    console.info('mock:: submit', {
      ...data, 
      email: withEmail ? data.email : undefined,
      lang
    })
    setSendStatus('sending');
    // @todo replace with real api call
    // this is a mock for the actual request
    setTimeout(() => {
      if (Math.random() > .5) {
        setSendStatus('error');
      } else {
        setSendStatus('success');
      }
      setTimeout(() => {
        setSendStatus(undefined)
      }, 4000)
    }, 2000)
  }
  const handleSubmitWithEmail = (e) => {
    handleSubmit(e, true)
  }

  // reset questionnaire state (ux + data)
  const handleReset = () => {
    setStage(0);
    setData(defaultData);
    setSendStatus(undefined);
  }

  // set "review my propositions" visibility
  const handleToggleReviewVisible = () => {
    setReviewVisible(!reviewVisible);
  }

  return (
    <div>
      <Helmet>
        <title>{translate('website-title')} | {translate('questionnaire')}</title>
      </Helmet>
      <div>
        {
          stage === 0 ?
          <div className={`question-container ${reviewVisible ? 'normalized': ''}`}>
            <ul className={`big-select ${reviewVisible ? 'hidden' : ''}`}>
              <li><button onClick={handleStopActivity}>{translate('add-activity-to-stop')}</button></li>
              <li><button onClick={handleDevelopActivity}>{translate('add-activity-to-develop')}</button></li>
            </ul>

            <ul className="buttons-row">
              {
                data.propositions.length || reviewVisible ?
              <li><button className={reviewVisible ? 'active' : ''} onClick={handleToggleReviewVisible}>{reviewVisible ? translate('hide-existing-propositions') : translate('review-your-propositions')} {!reviewVisible && `(${data.propositions.length})`}</button></li>
                : null
              }
              {data.propositions.length || reviewVisible ?
               <li><button className="important-button" onClick={handleGoToFinal} >{translate('go-to-submit')}</button></li>
              : null}
              
            </ul>
          </div>
          : null
        }
        {
          stage < numberOfQuestions + 1 && stage > 0 ?
          <div className="question-container">
            <h2>{questionsLabels[stage - 1]}</h2>
            
            <Textarea value={currentText} onChange={handleActiveTextChange} placeHolder={translate('write-here')} />
            <ul className="buttons-row">
            {
              stage > 1 ?
              <li><button onClick={handlePreviousStage}>{translate('previous-question')}</button></li>
              : null
            }
            {
              /*
              <li>
              <button onClick={handleGoToSummary}>
                {translate('go-back-to-summary')}
              </button>
              </li>
              */
            }
            {
              stage < numberOfQuestions ?
              <li><button disabled={currentText.length < TEXT_LIMIT} className="important-button" onClick={handleNextStage}>{translate('next-question')}</button></li>
              : <li><button className="important-button" disabled={currentText.length < TEXT_LIMIT} onClick={handleNextStage}>{translate('validate-proposition')}</button></li>
            }
            </ul>
            
          </div>
          : null
        }
        {
          stage === numberOfQuestions + 1 ?
          <div className="question-container">
            <h2>{translate('thank-you')}</h2>
            <ul className="big-select">
              <li><button onClick={handleGoToSummary}>{translate('add-another-proposition')}</button></li>
              <li><button className="important-button" onClick={handleGoToFinal}>{translate('go-to-submit')}</button></li>
            </ul>
          </div> : null
        }
        {
          stage === null ?
          <form className={`question-container ${reviewVisible ? 'normalized': ''}`} onSubmit={handleSubmit}>
            {
              reviewVisible ? null :
              <div>
                <h1 className="padded-container">{translate('submit-form-explanation')}</h1>
                <div className="important-section">
                  {/* <h2>{translate('submit-form-with-contact')}</h2> */}
                  <p>{translate('submit-form-anonymously-explanation')}</p>
                  <p>{translate('submit-form-with-contact-explanation')}</p>
                  <field>
                    <input type="email" onChange={handleEmailChange} value={data.email || ''} placeHolder={translate('email-prompt')} />
                  </field>
                  <ul className="buttons-row">
                  <li>
                    <button  onClick={handleSubmit} type="submit">{translate('submit-form-anonymously')}</button>
                  </li>
                  <li>
                      <button disabled={!data.email || !emailIsValid} className="important-button" onClick={handleSubmitWithEmail} type="submit">{translate('submit-form-with-contact')}</button>
                  </li>
                  
                    
                  </ul>
                </div>
              </div>
            }
            
            <ul className="buttons-row padded-container">
              <li>
                <button className={reviewVisible ? 'active' : ''} type="button" onClick={handleToggleReviewVisible}>{reviewVisible ? translate('hide-existing-propositions') : translate('review-your-propositions')}  {!reviewVisible && `(${data.propositions.length})`}</button>
              </li>
              <li>
                <button onClick={handleGoToSummary}>{translate('add-proposition')}</button>
              </li>
            </ul>
          </form>
          : null
        }
        {
          sendStatus ?
          <div className="status-container">
            <div className="status-content">
              <i>{translate(sendStatus)}</i>
            </div>
          </div>
          : null
        }
        
        {
          (stage === 0 || stage === null) && data.propositions.length && reviewVisible ? 
          <div className="propositions-container">
            <h2 className="padded-container">{translate('summary-title')} ({data.propositions.length})</h2>
            {
              data.propositions
              .reverse()
              .map((proposition, propositionIndex) => {
                const {type} = proposition;
                const labels = type === 'develop' ? [
                  translate('to-develop-question-1'),
                  translate('to-develop-question-2'),
                  translate('to-develop-question-3'),
                  translate('to-develop-question-4'),
                  translate('to-develop-question-5'),
                ] : 
                [
                  translate('to-stop-question-1'),
                  translate('to-stop-question-2'),
                  translate('to-stop-question-3'),
                  translate('to-stop-question-4'),
                ];

                const handleEditProposition = () => {
                  setQuestionnaireIndex(propositionIndex);
                  setStage(1)
                }

                const handleDeleteProposition = () => {
                  const newData = {
                    ...data,
                    propositions: data.propositions.filter((p, i) => i !== propositionIndex)
                  }
                  setData(newData)
                  if (newData.propositions.length === 0) {
                    setReviewVisible(false);
                  }
                }
                
                return (
                  <div key={propositionIndex} className="proposition">
                    <h3>
                      <span className="proposition-title">
                        {translate('Proposition')} {data.propositions.length - propositionIndex} ({translate(proposition.type === 'stop' ? 'add-activity-to-stop': 'add-activity-to-develop' )})
                      </span>
                      <span className="small-buttons-container">
                        <button onClick={handleEditProposition}>
                          {translate('edit')}
                        </button>
                        <button onClick={handleDeleteProposition}>
                          {translate('delete')}
                        </button>
                      </span>
                    </h3>
                    
                    {
                      labels.map((question, questionIndex) => {
                        const handleEdit = () => {
                          setQuestionnaireIndex(propositionIndex);
                          setStage(questionIndex + 1)
                        }
                        return (
                          <div className="question" key={questionIndex}>
                            <h4>{question}</h4>
                            <blockquote>
                              {proposition[`question${questionIndex + 1}`]}
                            </blockquote>
                            <button onClick={handleEdit}>
                              {translate('edit')}
                            </button>
                          </div>
                        )
                      })
                    }
                  </div>
                )
              
              })
            }
          </div>
          : null
        }
      </div>
    </div>
  )
}