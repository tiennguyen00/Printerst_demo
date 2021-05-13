import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import NumberFormat from "react-number-format";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Controller } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import { isValidPhoneNumber, allowPositive } from "../../util/form";
import "./Field.scss";

function Field(props) {
  const {
    disabled,
    defaultValue,
    options,
    label,
    required,
    helperText,
    control, // This prop for select input
    rules, // This prop for select input
    notRightLabel,
    typeField,
    typeInput,
    layout,
    ...rest
  } = props;
  if (typeInput === "phone") {
    return (
      <FormControl disabled={disabled} className="field" required={required}>
        <InputLabel className="MuiInputLabel-shrink">{label}</InputLabel>
        <Controller
          as={NumberFormat}
          thousandSeparator
          control={control}
          rules={{
            validate: isValidPhoneNumber,
          }}
          allowEmptyFormatting
          customInput={TextField}
          format="+## ## #### ####"
          defaultValue={defaultValue}
          {...rest}
        />
        <FormHelperText className="error-text">{helperText}</FormHelperText>
      </FormControl>
    );
  }

  if (typeInput === "select") {
    const isFieldValidation = !isEmpty(control);
    return (
      <Grid container alignItems="flex-end" className="field">
        <Grid item className="field-text" xs={layout.labelCol}>
          <span>{label}</span>
        </Grid>
        <Grid item xs={layout.inputCol}>
          <FormControl
            disabled={disabled}
            required={required}
            className={`field-${typeField} field-select`}
            fullWidth
          >
            {/* <InputLabel id="role-required">{label}</InputLabel> */}
            {isFieldValidation ? (
              <Controller
                as={
                  <Select>
                    {map(options, (option, i) => (
                      <MenuItem
                        name={option.value}
                        key={i}
                        value={option.value}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                }
                rules={rules}
                control={control}
                defaultValue={defaultValue}
                {...rest}
              />
            ) : (
              <Select defaultValue={defaultValue} {...rest}>
                {map(options, (option, i) => (
                  <MenuItem name={option.value} key={i} value={option.value}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            )}
            <FormHelperText className="error-text">{helperText}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container alignItems="flex-end" className="field">
      {!notRightLabel && (
        <Grid item className="field-text" xs={layout.labelCol}>
          <span>{label}</span>
        </Grid>
      )}
      <Grid item xs={notRightLabel ? 12 : layout.inputCol}>
        <TextField
          label={notRightLabel ? label : ""}
          inputProps={{ readOnly: disabled }}
          defaultValue={defaultValue}
          fullWidth
          required={required}
          error={!!helperText}
          helperText={helperText}
          className={`field-${typeField} ${disabled ? "filed-disable" : ""}`}
          onChange={(e) => {
            if (typeInput === "number") {
              return allowPositive(e);
            }
            return e;
          }}
          {...rest}
        />
      </Grid>
    </Grid>
  );
}

Field.propTypes = {
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  helperText: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  typeField: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  typeInput: PropTypes.string,
  label: PropTypes.string,
  rules: PropTypes.oneOfType([PropTypes.object]),
  control: PropTypes.oneOfType([PropTypes.object]),
  notRightLabel: PropTypes.bool,
  layout: PropTypes.oneOfType([PropTypes.object]),
};

Field.defaultProps = {
  disabled: false,
  required: false,
  helperText: "",
  defaultValue: "",
  typeField: "primary",
  options: [],
  label: "",
  rules: {},
  control: {},
  notRightLabel: false,
  typeInput: "text",
  layout: { labelCol: 3, inputCol: 9 },
};

export { Field };
