import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { StateModel } from '../../store/model/state.model';

export default function Guard() {

  const state = useSelector((state: StateModel) => state)
  const navigate = useNavigate();

  useEffect(() => {
    if (state.token == null) {
      navigate("/login")
    }
  }, [])

  return <>
    <Outlet />
  </>
}

