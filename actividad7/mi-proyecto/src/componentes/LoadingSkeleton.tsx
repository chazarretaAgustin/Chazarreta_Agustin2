export default function LoadingSkeleton() {
  return (
    <div 
      aria-busy="true" 
      style={{ 
        padding: '20px', 
        width: '300px', 
        margin: '10px 0', 
        border: '1px solid #ddd', 
        borderRadius: '5px',
        backgroundColor: '#fff',
        opacity: 0.7 
      }}
    >
      {/* Línea principal (Nombre) */}
      <div style={{ height: '20px', background: '#e0e0e0', marginBottom: '10px', width: '80%', borderRadius: '4px' }}></div>
      {/* Líneas secundarias (Detalle) */}
      <div style={{ height: '10px', background: '#f0f0f0', width: '60%', marginBottom: '5px', borderRadius: '2px' }}></div>
      <div style={{ height: '10px', background: '#f0f0f0', width: '70%', borderRadius: '2px' }}></div>
    </div>
  );
}