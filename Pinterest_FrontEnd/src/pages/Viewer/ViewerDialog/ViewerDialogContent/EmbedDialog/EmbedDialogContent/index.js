import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { setMessage } from '../../../../../../redux/message/messageActions';

import {
  Button,
  ButtonBase,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    contentTitle: {
      fontWeight: 'bold',
      marginBottom: theme.spacing(0.5),
    },
    embedOption: {
      border: 'solid transparent 2px',
      height: '100%',
      minHeight: 100,
      padding: theme.spacing(1),
      textAlign: 'left',
      transition: 'border-color 0.1s ease-out',
      width: '100%',
    },
    embedOptionActive: {
      borderColor: theme.palette.primary.main,
    },
    embedOptionButton: {
      height: '100%',
      width: '100%',
    },
    embedOptionWrapper: {
      flexBasis: 0,
      flexGrow: 1,
      margin: theme.spacing(1, 0, 2, 0),
    },
    linkButton: {
      '&:hover, &:focus': {
        background: 'transparent',
        textDecoration: 'none',
      },
      float: 'right',
      fontSize: 14,
      minWidth: 0,
      padding: 0,
    },
    linkButtonLabel: {
      fontWeight: 'normal',
      textTransform: 'none',
    },
    textareaWrapper: {
      width: '100%',
      paddingBottom: theme.spacing(1.5),
      paddingTop: theme.spacing(1),
    },
    textFieldRoot: {
      '& > div': {
        padding: theme.spacing(1.5, 2),
      },
      '& textarea': {
        fontSize: 14,
      },
      height: 80,
      width: '100%',
    },
}));

function EmbedDialogContent(props) {
    const dispatch = useDispatch();
    const s = useStyles();
    const [activeOption, setActiveOption] = useState(0);

    const viewerURL = `${window.origin}/${props.item._id}`;

    const embedScript = useMemo(() => {
      if (activeOption === 1) {
        const script = 'link';
  
        return script;
      }
  
      const iframeTitle = 'Pinterest';
  
      const iframeAttributes = [
        'width="100%"',
        'height="100%"',
        'border="0"',
        'frameborder="0"',
        'style="border: 0;"',
        'allowfullscreen',
        'mozallowfullscreen',
        'webkitallowfullscreen',
        'allow="vr;gyroscope;accelerometer"',
        `title="${iframeTitle}"`,
      ].join(' ');
  
      return `<iframe src="${viewerURL}" ${iframeAttributes} />`;
    }, [activeOption, props.item._id, viewerURL]);

    const handleCopyScript = () => {
      copy(embedScript);
      dispatch(setMessage('Link copied to your clipboard', 'success'));
    };
  

    return (
      <Grid container direction="column">
        <Grid container item spacing={2}>
          <Grid className={s.embedOptionWrapper} item>
            <ButtonBase className={s.embedOptionButton} disableRipple onClick={() => setActiveOption(0)}>
              <Paper className={clsx(s.embedOption, activeOption === 0 && s.embedOptionActive)}>
                <Typography variant="body2">Embed a Content Viewer directly on your page.</Typography>
              </Paper>
            </ButtonBase> 
          </Grid>

          <Grid className={s.embedOptionWrapper} item>
            <ButtonBase
              className={s.embedOptionButton}
              disableRipple
              onClick={() => setActiveOption(1)}
            >
              <Paper
                className={clsx(s.embedOption, activeOption === 1 && s.embedOptionActive)}
              >
                <Typography variant="body2">Embed a Content Thumbnail that will open a Pinterest Viewer when clicked.</Typography>
              </Paper>
            </ButtonBase>
          </Grid>
          <Grid className={s.textareaWrapper} item>
            <TextField
              classes={{
                root: s.textFieldRoot,
              }}
              InputProps={{
                readOnly: true,
              }}
              multiline
              placeholder="Embed Script"
              rowsMax={3}
              value={embedScript}
              variant="outlined"
            />
            <Button
              classes={{
                label: s.linkButtonLabel,
              }}
              className={s.linkButton}
              color="primary"
              disableElevation
              disableRipple
              onClick={() => handleCopyScript()}
            >
              Copy Embed Script
            </Button>
          </Grid>
        </Grid>

      </Grid>
    )

}

export default EmbedDialogContent;