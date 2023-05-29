<template>
    <!-- Unidade Consumidora -->
    <VCard>
        <VCardTitle>
            <v-icon
                icon="mdi-home-city"
                color="green-darken-1"
                size="large"
                class="me-2"
            ></v-icon>
                Dados da Unidade Consumidora
        </VCardTitle>

        <VCardText class="pt-4">
            <VRow>    
                <VCol cols=6>
                    <VTextField label="Código" />
                </VCol>
                <VCol cols=6>
                    <VTextField label="Tensão de Fornecimento" />
                </VCol>
                <VCol cols=6>
                    <VSelect label="Grupo" :items= "['A1', 'A2', 'A3a', 'A4', 'AS']"/>
                </VCol>
                <VCol cols=6>
                    <VSelect label="Subgrupo" :items="['Residencial', 'Industrial', 'Comercial', 'Rural', 'Poder Público']"/>
                </VCol>
                <VCol cols=6>
                    <VSelect label="Modalidade Tarifária" :items= "['Horária Azul', 'Horária Verde']" />
                </VCol>
                <VCol cols=12>
                    <VTextField label="Endereço" />
                </VCol>
                <VCol cols=2>
                    <VTextField label="Número" />
                </VCol>
                <VCol cols=2>
                    <VTextField label="CEP" />
                </VCol>
                <VCol cols=4>
                    <VTextField label="Cidade" />
                </VCol>
                <VCol cols=4>
                    <VTextField label="Estado" />
                </VCol>
                <VCol cols=6>
                    <VTextField label="Demanda Contratada na Ponta" />
                </VCol>
                <VCol cols=6>
                    <VTextField label="Demanda Contratada Fora de Ponta" />
                </VCol>
                <VCol cols=6>
                    <VTextField label="Previsão de crescimento" />
                </VCol>
                <VCol cols=6>
                    <VTextField label="Possui sistema Fotovoltáico" />
                </VCol>
            </VRow>
        </VCardText>

        <VCardActions>
            <v-btn
                class="text-none"
                color="grey-lighten-1"
                variant="flat"
            >
                Salvar
            </v-btn>
            <v-btn
                class="text-none"
                color="grey-lighten-3"
                variant="flat"
            >
                Cancelar
            </v-btn>
            <v-btn
                class="text-none"
                color="grey-lighten-3"
                variant="flat"
            >
                Resetar
            </v-btn>
        </VCardActions>
    </VCard>

    <VDivider class="my-4"/>
    <!-- Concessionária -->
    <VCard>
        <VCardTitle>
            <v-icon
                icon="mdi-home-lightning-bolt"
                color="green-darken-1"
                size="large"
                class="me-2"
            ></v-icon>
                Dados da Distribuidora/Concessionária/Permissionária (Cooperativa)
        </VCardTitle>

        <VCardText class="pt-4">
            <VRow>    
                <VCol cols=6>
                    <VTextField label="Nome" />
                </VCol>
                <VCol cols=6>
                    <VTextField label="CNPJ" />
                </VCol>
                <VCol cols=6>
                    <VTextField label="Telefone" />
                </VCol>
                <VCol cols=12>
                    <VTextField label="Endereço" />
                </VCol>
                <VCol cols=2>
                    <VTextField label="Número" />
                </VCol>
                <VCol cols=2>
                    <VTextField label="CEP" />
                </VCol>
                <VCol cols=4>
                    <VTextField label="Cidade" />
                </VCol>
                <VCol cols=4>
                    <VTextField label="Estado" />
                </VCol>
            </VRow>
        </VCardText>
         <VCardActions>
            <v-btn
                class="text-none"
                color="grey-lighten-1"
                variant="flat"
            >
                Salvar
            </v-btn>
            <v-btn
                class="text-none"
                color="grey-lighten-3"
                variant="flat"
            >
                Cancelar
            </v-btn>
            <v-btn
                class="text-none"
                color="grey-lighten-3"
                variant="flat"
            >
                Resetar
            </v-btn>
        </VCardActions>
    </VCard>

    <VDivider class="my-4"/>
    <!-- Tarifas -->
    <VCard>
        <VCardTitle>
            <v-icon
                icon="mdi-bank"
                color="green-darken-1"
                size="large"
                class="me-2"
            ></v-icon>
                Informações Tarifas/Tributos
        </VCardTitle>

        <VCardText class="pt-4">
            <VRow>    
                <VCol cols=6>
                    <VTextField label="Tarifa Demanda de Ponta" />
                </VCol>
                <VCol cols=6>
                    <VTextField label="Tarifa Demanda Fora de Ponta" />
                </VCol>
                <VCol cols=6>
                    <VTextField label="Tarifa Energia de Ponta" />
                </VCol>
                <VCol cols=6>
                    <VTextField label="Tarifa Energia Fora de Ponta" />
                </VCol>
                <VCol cols=6>
                    <VTextField label="PIS/PASEP + COFINS + ICMS (%)" />
                </VCol>
            </VRow>
        </VCardText>
         <VCardActions>
            <v-btn
                class="text-none"
                color="grey-lighten-1"
                variant="flat"
            >
                Salvar
            </v-btn>
            <v-btn
                class="text-none"
                color="grey-lighten-3"
                variant="flat"
            >
                Cancelar
            </v-btn>
            <v-btn
                class="text-none"
                color="grey-lighten-3"
                variant="flat"
            >
                Resetar
            </v-btn>
        </VCardActions>
    </VCard>
</template>
