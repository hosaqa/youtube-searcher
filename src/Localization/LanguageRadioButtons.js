import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize, Translate } from 'react-localize-redux';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import localizationTranslations from './translations.json';

const LanguageRadioButtons = ({
  languages,
  activeLanguage,
  setActiveLanguage,
  addTranslation,
}) => {
  if (!activeLanguage) return false;

  addTranslation(localizationTranslations);

  const handleChange = e => setActiveLanguage(e.target.value);

  return (
    <FormControl component="fieldset">
      <Translate>
        {({ translate }) => (
          <>
            <FormLabel component="legend">
              {translate('radio-buttons.label')}
            </FormLabel>
            <Box pt={1}>
              <RadioGroup
                aria-label={translate('radio-buttons.label')}
                name="localization"
                value={activeLanguage.code}
                onChange={handleChange}
              >
                {languages.map(lang => (
                  <FormControlLabel
                    key={lang.name}
                    value={lang.code}
                    control={<Radio />}
                    label={lang.name}
                  />
                ))}
              </RadioGroup>
            </Box>
          </>
        )}
      </Translate>
    </FormControl>
  );
};

LanguageRadioButtons.propTypes = {
  languages: PropTypes.array,
  activeLanguage: PropTypes.object,
  setActiveLanguage: PropTypes.func,
  addTranslation: PropTypes.func,
};

export default withLocalize(LanguageRadioButtons);
