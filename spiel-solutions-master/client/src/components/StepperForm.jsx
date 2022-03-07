import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import SelectInput from "../components/SelectInput";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Script name", "add a page", "add a modal", "Finalize script"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <div
          style={{
            textAlign: "center",
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            className="w-25"
            id="filled-basic"
            label="Script Name"
            variant="filled"
          />{" "}
          <br />
          <TextField
            required
            id="standard-required"
            label="Snippet"
            className="w-25 mt-5"
          />
        </div>
      );
    case 1:
      return (
        <div
          style={{
            textAlign: "center",
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <SelectInput elementType={"Page name"} />
        </div>
      );
    case 2:
      return (
        <div
          style={{
            textAlign: "center",
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <SelectInput elementType={"Modal name"} />
        </div>
      );
    case 3:
      return (
        <div style={{ textAlign: "center", height: "300px" }}>
          maybe show how the results would look
        </div>
      );
    default:
      return "Unknown step";
  }
}

export function HorizontalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div className="mt-5">
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const StepperForm = () => {
  return (
    <>
      <button
        type="button"
        className="btn btn-sm"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        {" "}
        <i
          className="bi bi-plus-square-dotted"
          style={{ fontSize: "2em", color: "#0E6EFC" }}
        ></i>
      </button>
      <div>
        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            style={{ maxWidth: "80%" }}
          >
            <div className="modal-content" style={{ borderRadius: "25px" }}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Create A New Script
                </h5>
                <span
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  style={{
                    color: "red",
                    fontSize: "1.25em",
                  }}
                >
                  <i className="bi bi-x-square"></i>
                </span>
              </div>
              <div className="modal-body">
                {" "}
                {/* add stemper here */}
                <HorizontalLinearStepper />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepperForm;
