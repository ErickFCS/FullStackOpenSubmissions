import { Diagnosis } from '../types/diagnosis.js'
import diagnosisData from '../../data/diagnoses.js'

export const getAll = (): Diagnosis[] => {
    return diagnosisData
}