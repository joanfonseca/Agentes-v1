import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Agente } from 'src/app/models/agente';
import { AgentesService } from 'src/app/service/agentes.service';

@Component({
  selector: 'app-agnte',
  templateUrl: './agnte.component.html',
  styleUrls: ['./agnte.component.css']
})
export class AgnteComponent implements OnInit {
  formGroup: FormGroup
  agentes: Array<Agente>
  dialog: boolean
  constructor(private agenteService: AgentesService, private formBuilder: FormBuilder,) {

    this.agentes = new Array<Agente>()
    this.formGroup = this.formBuilder.group({
      idAgente: new FormControl('', []),
      nombreAgente: new FormControl('', [Validators.required]),
      codigo: new FormControl('', [Validators.required]),
      codigoSecretaria: new FormControl('', [Validators.required]),
      fechaInicio: new FormControl('', [Validators.required])
    })
    this.dialog = false
  }

  ngOnInit(): void {
    this.getAgentes()
  }

  getAgentes(): void {
    this.agenteService.getAgentes().subscribe(res => {
      console.log(res);
      this.agentes = res
    })
  }
  open(): void {
    this.formGroup.reset()
    this.dialog = true
  }
  close(): void {
    this.dialog = false
  }

  save(): void {
    if (this.formGroup.valid) {
      let agente = new Agente()
      agente.codigo = this.formGroup.get('codigo')?.value
      agente.nombreAgente = this.formGroup.get('nombreAgente')?.value
      agente.codigoSecretaria = this.formGroup.get('codigoSecretaria')?.value
      agente.fechaInicio = this.formGroup.get('fechaInicio')?.value.getTime()
      this.agenteService.createAgente(agente).subscribe(res => {
        console.log(res);
        this.getAgentes()
        this.close()
      }, err => {
        console.log('Error servicio agente');
        console.log(err);
        this.close()

      })
    }
  }
  getDate(fecha: number) {
    let date = new Date()
    let date2 = new Date()
    date2.setTime(fecha)
    return date.getFullYear() - date2.getFullYear();

  }
}
