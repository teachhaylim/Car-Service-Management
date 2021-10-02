import { Upload } from '@mui/icons-material';
import { Button, Grid, Input, Avatar } from '@mui/material';
import { styled } from '@mui/styles';
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { checkFile } from 'utils/generalFunc';

const StyledAvatar = styled(Avatar)(({ theme }) => {
    return {
        boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.2)",
        borderRadius: theme.borderRadius,
        "&:hover": {
            transition: "0.2s all",
            border: `1px solid ${theme.palette.secondary.main}`,
        }
    };
});

const SingleFileUpload = ({file, onChange}) => {
    const { t } = useTranslation();
    const inputRef= useRef(null);

    const handleUpload = (e) => {
        onChange(e.target.files[0] || {});
    };

    return (
        <>
            <Grid container direction="column" sx={{ height: "100%" }} alignItems="center" justifyContent="space-around">
                <Grid item sx={{ width: "80%", height: "80%" }}>
                    <StyledAvatar src={checkFile(file)} variant="rounded" sx={{ width: "100%", height: "100%", }} />
                </Grid>

                <Grid item sx={{ height: "10%" }}>
                    <Button onClick={() => inputRef.current.click()} color="primary" variant="outlined" startIcon={<Upload />}>
                        <Input inputRef={inputRef} onChange={handleUpload} style={{ display: "none" }} accept="image/*" type="file" />
                        {t("upload")}
                    </Button>
                </Grid>
            </Grid>
        </>
    )
};

SingleFileUpload.propTypes = {
    file: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default SingleFileUpload;
