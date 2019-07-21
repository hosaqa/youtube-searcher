import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize, Translate } from 'react-localize-redux';
import styled from '@emotion/styled';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import localizationTranslations from './translations.json';

const Form = styled.form`
  display: inline-flex;
`;

const StyledPaper = styled(Paper)`
  padding: 6px 12px;
`;

const PaperInner = styled.div`
  position: relative;
`;

const LanguageToggle = ({
  languages,
  activeLanguage,
  setActiveLanguage,
  addTranslation,
}) => {
  if (!activeLanguage) return false;

  addTranslation(localizationTranslations);

  const handleChange = e => setActiveLanguage(e.target.value);

  return (
    <Form autoComplete="off">
      <FormControl>
        <StyledPaper>
          <Translate>
            {({ translate }) => (
              <PaperInner>
                <InputLabel shrink htmlFor="localization">
                  {translate('select.label')}
                </InputLabel>
                <Select
                  value={activeLanguage.code}
                  onChange={handleChange}
                  name="localization"
                  displayEmpty
                  input={
                    <Input
                      name="localization"
                      id="localization"
                      aria-label={translate('select.label')}
                    />
                  }
                >
                  {languages.map(lang => (
                    <MenuItem value={lang.code} key={lang.code}>
                      {lang.name}
                    </MenuItem>
                  ))}
                </Select>
              </PaperInner>
            )}
          </Translate>
        </StyledPaper>
      </FormControl>
    </Form>
  );
};

LanguageToggle.propTypes = {
  languages: PropTypes.array,
  activeLanguage: PropTypes.object,
  setActiveLanguage: PropTypes.func,
  addTranslation: PropTypes.func,
};

export default withLocalize(LanguageToggle);
