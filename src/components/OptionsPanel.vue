<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useAppPropertiesStore } from '../store/AppProperties';
import { ModelLoadCompleteEvent } from '../util/types/ModelLoadCompleteEvent';

import type { Object3D } from 'three';

import { getAssociatedLoader } from '../util/load/upload';
import { displayModel } from '../util/graphics/GraphicsBundle';

export default defineComponent({
    name: 'OptionsPanel',
    data() {
        const appProperties = useAppPropertiesStore();

        return {
            isDisplayingModel: computed(() => appProperties.isDisplayingModel),
            setIsLoadingModel: (isLoadingModel: boolean) => {
                appProperties.isLoadingModel = isLoadingModel
            },
            setIsDisplayingModel: (isDisplayingModel: boolean) => {
                appProperties.isDisplayingModel = isDisplayingModel;
            }
        }
    },
    methods: {
        uploadFile( e: Event ) {

            const target = e.target as HTMLInputElement;
            const files = target.files;

            if( files ) {
                const inputFile = files[ 0 ];
                const loader = getAssociatedLoader( inputFile.name );

                this.setIsLoadingModel(true);

                loader.load( inputFile, (model: Object3D) => {
                    displayModel( model );
                    this.setIsLoadingModel(false);
                    this.setIsDisplayingModel(true);
                } );
            }
        }
    }
});
</script>

<template>
    <nav>
        <button class="optionAvailable">
            <label for="modelUploadInput">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 47.5"><path d="M7.05 40q-1.2 0-2.1-.925-.9-.925-.9-2.075V11q0-1.15.9-2.075Q5.85 8 7.05 8h14l3 3h17q1.15 0 2.075.925.925.925.925 2.075v23q0 1.15-.925 2.075Q42.2 40 41.05 40Zm0-29v26h34V14H22.8l-3-3H7.05Zm0 0v26Z"/></svg>
            </label>
        </button>
        <input @change="uploadFile" type="file" name="modelUploadInput" id="modelUploadInput" />
        <button :class="isDisplayingModel ? 'optionAvailable' : ''">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 47.5"><path d="M22.65 34h3V22h-3ZM24 18.3q.7 0 1.175-.45.475-.45.475-1.15t-.475-1.2Q24.7 15 24 15q-.7 0-1.175.5-.475.5-.475 1.2t.475 1.15q.475.45 1.175.45ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 23.95q0-4.1 1.575-7.75 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24.05 4q4.1 0 7.75 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm.05-3q7.05 0 12-4.975T41 23.95q0-7.05-4.95-12T24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24.05 41ZM24 24Z"/></svg>
        </button>
        <button :class="isDisplayingModel ? 'optionAvailable' : ''">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.5 47.5"><path d="M24 40q-6.65 0-11.325-4.675Q8 30.65 8 24q0-6.65 4.675-11.325Q17.35 8 24 8q4.25 0 7.45 1.725T37 14.45V8h3v12.7H27.3v-3h8.4q-1.9-3-4.85-4.85Q27.9 11 24 11q-5.45 0-9.225 3.775Q11 18.55 11 24q0 5.45 3.775 9.225Q18.55 37 24 37q4.15 0 7.6-2.375 3.45-2.375 4.8-6.275h3.1q-1.45 5.25-5.75 8.45Q29.45 40 24 40Z"/></svg>
        </button>
    </nav>
</template>

<style lang="scss" scoped>
nav {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    button {
        background-color: #fff;
        width: 100%;
        height: 100%;
        border: 1px solid transparent;
        border-radius: 10px;
        pointer-events: none;
        transition: border-color 150ms ease;

        label {
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            width: 100%;
            height: 100%;
        }

        svg {
            width: 30px;
            height: 30px;
            opacity: 0.1;
            pointer-events: none;
        }
    }

    button:hover {
        border-color: rgba(0, 0, 200, 1.0);
    }

    button.optionAvailable {
        pointer-events: all;

        svg {
            opacity: 1.0;
        }
    }

    input[type="file"] {
        display: none;
    }
}
</style>