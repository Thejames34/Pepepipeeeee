import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <div class="about-container">
      <div class="about-header">
        <h1>Acerca de HOLA</h1>
        <p class="subtitle">Sistema de gestión y ejercicios</p>
      </div>
      
      <div class="about-content">
        <div class="feature-card">
          <i class="fas fa-database"></i>
          <h3>Gestión</h3>
          <p>Sistema completo de gestión de datos con CRUD operations.</p>
        </div>
        
        <div class="feature-card">
          <i class="fas fa-tasks"></i>
          <h3>Ejercicios</h3>
          <p>Módulo de ejercicios interactivos para aprendizaje.</p>
        </div>
        
        <div class="feature-card">
          <i class="fas fa-users"></i>
          <h3>Usuarios</h3>
          <p>Sistema de autenticación y gestión de usuarios.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    
    .about-header {
      text-align: center;
      margin-bottom: 60px;
    }
    
    .about-header h1 {
      font-size: 3rem;
      color: #333;
      margin-bottom: 10px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .subtitle {
      font-size: 1.2rem;
      color: #666;
    }
    
    .about-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
    }
    
    .feature-card {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.3s ease;
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
    }
    
    .feature-card i {
      font-size: 3rem;
      color: #667eea;
      margin-bottom: 20px;
    }
    
    .feature-card h3 {
      font-size: 1.5rem;
      color: #333;
      margin-bottom: 15px;
    }
    
    .feature-card p {
      color: #666;
      line-height: 1.6;
    }
  `]
})
export class AboutComponent { }
