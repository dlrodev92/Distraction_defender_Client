
import '../scss/universalModal.scss'; // Asegúrate de importar los estilos de Sass

const UniversalModal = ({ children,  }) => {
  return (
    <div className="universal-modal">
      <div className="universal-modal-content">
        {children}
      </div>
    </div>
  );
};

export default UniversalModal;