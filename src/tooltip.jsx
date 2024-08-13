import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip } from 'bootstrap';

const BootstrapTooltip = ({ children, title, placement }) => {
  useEffect(() => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new Tooltip(tooltipTriggerEl);
    });
    // Cleanup tooltips when the component is unmounted
    return () => {
      tooltipList.forEach(tooltip => tooltip.dispose());
    };
  }, []);

  return (
    <span
      data-bs-toggle="tooltip"
      data-bs-placement={placement}
      title={title}
      data-bs-custom-class="custom-tooltip"
    >
      {children}
    </span>
  );
};

export default BootstrapTooltip;
