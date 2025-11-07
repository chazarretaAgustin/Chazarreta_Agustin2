"use client";
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { favoriteSchema } from '@/app/validations/favorite.schema'; 
import { UseMutationResult } from '@tanstack/react-query';
import { PokemonFavorite } from '@/app/lib/database';

// Estilos basicos para el modal
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '500px',
    padding: '20px'
  },
};

// Configura el elemento raíz para el modal
if (typeof window !== 'undefined') {
  Modal.setAppElement(document.body);
}

// Define las props que el modal recibira
interface FavoriteFormModalProps {
  isOpen: boolean; 
  onClose: () => void; 
  pokemonName: string; 
  addFavoriteMutation: UseMutationResult<PokemonFavorite, Error, PokemonFavorite, unknown>;
}

// Define la estructura de los valores del formulario
interface FormValues {
  customName: string;
  description: string;
}

export default function FavoriteFormModal({ 
  isOpen, 
  onClose, 
  pokemonName, 
  addFavoriteMutation 
}: FavoriteFormModalProps) {
  
  const initialValues: FormValues = {
    customName: '',
    description: ''
  };

  const handleSubmit = async (values: FormValues) => {
    addFavoriteMutation.mutate({
      name: pokemonName, 
      customName: values.customName, 
      description: values.description 
    }, {
      onSuccess: () => {
        onClose(); 
      }
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Agregar a Favoritos"
    >
      <h2>Agregar a Favoritos</h2>
      <p>Estás agregando a: <strong>{pokemonName.toUpperCase()}</strong></p>
      
      <Formik
        initialValues={initialValues}
        validationSchema={favoriteSchema} 
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="customName" style={{ display: 'block', marginBottom: '5px' }}>Nombre Personalizado *</label>
              <Field 
                type="text" 
                id="customName" 
                name="customName" 
                style={{ width: '100%', padding: '8px' }} 
              />
              <div style={{ color: 'red', fontSize: '0.9em' }}>
                <ErrorMessage name="customName" component="div" />
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="description" style={{ display: 'block', marginBottom: '5px' }}>Descripción (Opcional)</label>
              <Field 
                as="textarea" 
                id="description" 
                name="description" 
                style={{ width: '100%', padding: '8px', minHeight: '80px' }} 
              />
              <div style={{ color: 'red', fontSize: '0.9em' }}>
                <ErrorMessage name="description" component="div" />
              </div>
            </div>

            {addFavoriteMutation.isError && (
              <p style={{ color: 'red' }}>Error: {addFavoriteMutation.error.message}</p>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                type="button" 
                onClick={onClose} 
                style={{ padding: '10px 15px' }}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                disabled={isSubmitting || !isValid || !dirty} 
                style={{ padding: '10px 15px', background: '#4CAF50', color: 'white', border: 'none' }}
              >
                {isSubmitting ? 'Guardando...' : 'Guardar Favorito'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}