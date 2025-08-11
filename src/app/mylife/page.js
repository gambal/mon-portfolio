// src/app/mylife/page.js
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchProjects } from '../../utils/fetchProjects';
import './mylife.css';

export default function Mylife() {
      const [mylife, setMylife] = useState([]);

  useEffect(() => {
    fetchProjects().then(setMylife);
  }, []);
  return <div>Hello test page</div>;
}
