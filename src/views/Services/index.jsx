import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

const ServiceIndex = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const handleAddShop = () => {
        const state = {
            object: {},
            isEdit: false,
        }

        navigate("edit", { state });
    };

    return (
        <div>
            Service Page

            <Button variant="contained" startIcon={<Add />} onClick={handleAddShop}> {t("addBtn")} </Button>
        </div>
    )
}

export default ServiceIndex
