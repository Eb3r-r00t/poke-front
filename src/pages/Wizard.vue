<template>
    <div class="wizard-body">
        <div class="wizard-wrapper">
            <div class="wizard-header">
                <div class="wizard-logo">
                    <router-link to="/">
                        <img src="layout/images/logo-black.png" alt="babylon-layout"/>
                    </router-link>
                </div>
            </div>

            <div class="wizard-content">
                <div class="wizard-card">
                    <div class="wizard-card-header">
                        <div class="wizard-card-header-banner">
                            <div class="banner-logo">
                                <img src="layout/images/extensions/babylon-icon.png" alt="babylon-layout"/>
                            </div>
                            <div class="banner-image banner-1" :class="{' active-banner': activeTab === 'register'}">
                                <h1>Create a Babylon Account</h1>
                                <img src="layout/images/extensions/bg-header.png" alt="babylon-layout"/>
                            </div>
                            <div class="banner-image banner-2" :class="{' active-banner': activeTab === 'tier'}">
                                <h1>Choose Your Account Type</h1>
                                <img src="layout/images/extensions/bg-header-2.png" alt="babylon-layout"/>
                            </div>
                            <div class="banner-image banner-3" :class="{' active-banner': activeTab === 'payment'}">
                                <h1>Complete Your Registration with Payment</h1>
                                <img src="layout/images/extensions/bg-header-3.png" alt="babylon-layout"/>
                            </div>
                        </div>
                        <div class="wizard-card-tabs">
                            <div class="wizard-card-tab register-tab" :class="{'selected-tab': activeTab === 'register'}"
                                @click="clickNext('register')">
                                REGISTER
                            </div>
                            <div class="wizard-card-tab tier-tab" :class="{'selected-tab': activeTab === 'tier'}"
                                @click="clickNext('tier')">
                                CHOOSE TIER
                            </div>
                            <div class="wizard-card-tab payment-tab" :class="{'selected-tab': activeTab === 'payment'}"
                                @click="clickNext('payment')">
                                PAYMENT
                            </div>
                        </div>
                    </div>

                    <div class="wizard-card-content register" :class="{'active-content': activeTab === 'register'}">
                        <div class="warning">
                            <i class="pi pi-exclamation-circle"></i>
                            <p>You must have an account to complete your order and manage your downloads.</p>
                        </div>

                        <div class="wizard-forms-wrapper grid grid-nogutter">
                            <div class="col-12 md:col-6 wizard-forms">
                                <label for="username" class="form-label">Enter Username</label>
                                <InputText id="username" type="text" />

                                <label for="email" class="form-label">Enter Email</label>
                                <InputText id="email" type="text" />

                                <label for="password" class="form-label">Enter Password</label>
                                <InputText id="password" type="password" />
                            </div>

                            <div class="col-12 md:col-6 wizard-forms">
                                <label for="timezone" class="form-label">Select Timezone</label>
                                <Dropdown id="timezone" :style="{'margin-bottom':'10px'}" :options="dropdownOptions1" optionLabel="label" v-model="selectDropdownOptions1" placeholder="Select Time Zone"></Dropdown>

                                <div class="calendar">
                                    <label for="birthdate" class="form-label">Birthdate</label>
                                    <Calendar id="birthdate" v-model="birthDate" appendTo="body"></Calendar>
                                </div>

                                <label for="babylon" class="form-label">Where did you hear Babylon?</label>
                                <Dropdown id="babylon" :options="dropdownOptions2" optionLabel="label" v-model="selectDropdownOptions2"
                                            appendTo="body" :style="{'margin-bottom':'10px'}" placeholder="Where did you hear Babylon?"></Dropdown>
                            </div>
                        </div>

                        <div class="wizard-button">
                            <Button class="continue-button" label="CONTINUE" @click="clickNext('tier')"></Button>
                        </div>
                    </div>

                    <div class="wizard-card-content tier" :class="{'active-content': activeTab === 'tier'}">
                        <div class="wizard-tier-cards grid ">
                            <div class="col-12 md:col-4 ">
                                <div class="wizard-tier-card beginner" :class="{'active-tier-card': activeCard === 'basic'}"
                                    @click="selectTier('basic')">
                                    <div class="wizard-tier-card-header">
                                        <img src="layout/images/extensions/asset-beginner.png" alt="babylon-layout"/>
                                    </div>
                                    <div class="wizard-tier-card-content">
                                        <div class="title">
                                            <h1>Beginner</h1>
                                            <span>Starting from $5 per month</span>
                                        </div>
                                        <ul>
                                            <li class="active-list-item">
                                                <i class="pi pi-check-circle"></i>
                                                <p>Responsive</p>
                                            </li>
                                            <li>
                                                <i class="pi pi-check-circle"></i>
                                                <p>Push Notifications</p>
                                            </li>
                                            <li>
                                                <i class="pi pi-check-circle"></i>
                                                <p>7/24 Support</p>
                                            </li>
                                            <li>
                                                <i class="pi pi-check-circle"></i>
                                                <p>Unlimited Space</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 md:col-4 ">
                                <div class="wizard-tier-card professional"
                                    :class="{'active-tier-card': activeCard === 'professional'}"
                                    @click="selectTier('professional')">
                                    <div class="wizard-tier-card-header">
                                        <img src="layout/images/extensions/asset-pro.png" alt="babylon-layout"/>
                                    </div>
                                    <div class="wizard-tier-card-content">
                                        <div class="title">
                                            <h1>Professional</h1>
                                            <span>Starting from $10 per month</span>
                                        </div>
                                        <ul>
                                            <li class="active-list-item">
                                                <i class="pi pi-check-circle"></i>
                                                <p>Responsive</p>
                                            </li>
                                            <li class="active-list-item">
                                                <i class="pi pi-check-circle"></i>
                                                <p>Push Notifications</p>
                                            </li>
                                            <li>
                                                <i class="pi pi-check-circle"></i>
                                                <p>7/24 Support</p>
                                            </li>
                                            <li>
                                                <i class="pi pi-check-circle"></i>
                                                <p>Unlimited Space</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 md:col-4 ">
                                <div class="wizard-tier-card enterprise"
                                    :class="{'active-tier-card': activeCard === 'enterprise'}"
                                    @click="selectTier('enterprise')">
                                    <div class="wizard-tier-card-header">
                                        <img src="layout/images/extensions/asset-enterprise.png" alt="babylon-layout"/>
                                    </div>
                                    <div class="wizard-tier-card-content">
                                        <div class="title">
                                            <h1>Enterprise</h1>
                                            <span>Starting from $20 per month</span>
                                        </div>
                                        <ul>
                                            <li class="active-list-item">
                                                <i class="pi pi-check-circle"></i>
                                                <p>Responsive</p>
                                            </li>
                                            <li class="active-list-item">
                                                <i class="pi pi-check-circle"></i>
                                                <p>Push Notifications</p>
                                            </li>
                                            <li class="active-list-item">
                                                <i class="pi pi-check-circle"></i>
                                                <p>7/24 Support</p>
                                            </li>
                                            <li class="active-list-item">
                                                <i class="pi pi-check-circle"></i>
                                                <p>Unlimited Space</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="wizard-button">
                            <Button class="continue-button"  label="CONTINUE"
                                    @click="clickNext('payment')"></Button>
                        </div>
                    </div>

                    <div class="wizard-card-content payment" :class="{'active-content': activeTab === 'payment'}">
                        <div class="wizard-forms-wrapper">
                            <div class="wizard-forms ">
                                <div class="customPanel grid">
                                    <div class="col-1 lg:col-1 md:col-1" style="line-height: 2em">
                                        <RadioButton name="group1" value="Credit" v-model="radioButton1" id="credit"></RadioButton>
                                    </div>
                                    <div class="col-11 lg:col-5 md:col-5">
                                        <div class="credits">
                                            <img src="layout/images/extensions/asset-mastercard.png"
                                                alt="babylon-layout"/>
                                            <img src="layout/images/extensions/asset-visa.png" alt="babylon-layout"/>
                                            <img src="layout/images/extensions/asset-amex.png" alt="babylon-layout"/>
                                        </div>
                                    </div>
                                    <div class="col-1 lg:col-1 md:col-1" style="line-height: 2em">

                                        <RadioButton name="group1" value="Paypal" v-model="radioButton1" id="paypal"></RadioButton>
                                    </div>
                                    <div class="col-11 lg:col-5 md:col-5">
                                        <div class="paypal">
                                            <img src="layout/images/extensions/asset-paypal.png" alt="babylon-layout"/>
                                        </div>
                                    </div>
                                </div>

                                <div class="numbers grid">
                                    <div class="col-12">
                                        <label for="name" class="form-label">Cardholder Name</label>
                                        <InputText id="name" type="text" />
                                    </div>
                                </div>

                                <div class="numbers grid">
                                    <div class="col-12 md:col-6">
                                        <label for="number" class="form-label">Cardholder Number</label>
                                        <InputMask mask="9999-9999-9999-9999"></InputMask>
                                    </div>
                                    <div class="col-6 md:col-3">
                                        <label for="date" class="form-label">Date</label>
                                        <InputMask mask="99/99"></InputMask>
                                    </div>
                                    <div class="col-6 md:col-3">
                                        <label for="ccv" class="form-label">CCV</label>
                                        <InputMask mask="999"></InputMask>
                                    </div>
                                </div>

                                <div style="margin-top: 24px; padding-left: 1.5rem;">
                                    <Checkbox v-model="checked" :binary="true"></Checkbox>
                                    <label class="form-inline-label ml-2">Save credit card information for future usage</label>
                                </div>
                            </div>
                        </div>

                        <div class="wizard-button">
                            <div class="order-summary order-default" :class="{'selected-order': activeCard === ''}">
                                <p>ORDER SUMMARY</p>
                                <h1>$00.00</h1>
                                <span>Please select one tier.</span>
                            </div>
                            <div class="order-summary order-beginner" :class="{'selected-order': activeCard === 'basic'}">
                                <p>ORDER SUMMARY</p>
                                <h1>$5.00</h1>
                                <span>Babylon Beginner Membership.</span>
                            </div>
                            <div class="order-summary order-professional"
                                :class="{'selected-order': activeCard === 'professional'}">
                                <p>ORDER SUMMARY</p>
                                <h1>$10.00</h1>
                                <span>Babylon Professional Membership.</span>
                            </div>
                            <div class="order-summary order-enterprise"
                                :class="{'selected-order': activeCard === 'enterprise'}">
                                <p>ORDER SUMMARY</p>
                                <h1>$20.00</h1>
                                <span>Babylon Enterprise Membership.</span>
                            </div>
                            <Button label="COMPLETE ORDER"></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeTab: "register",
            activeCard: "",
            selectDropdownOptions1: null,
            selectDropdownOptions2: null,
            birthDate: null,
            checked: false,
            radioButton1: '',
            dropdownOptions1: [
                {label: 'UTC-12.00', value: {id: 1, name: 'UTC-12.00', code: '-12'}},
                {label: 'UTC-11.00', value: {id: 2, name: 'UTC-11.00', code: '-11'}},
                {label: 'UTC-10.00', value: {id: 3, name: 'UTC-10.00', code: '-10'}},
                {label: 'UTC-09.30', value: {id: 4, name: 'UTC-09.30', code: '-93'}},
                {label: 'UTC-09.00', value: {id: 5, name: 'UTC-09.00', code: '-09'}},
                {label: 'UTC-08.00', value: {id: 6, name: 'UTC-08.00', code: '-08'}},
                {label: 'UTC-07.00', value: {id: 7, name: 'UTC-07.00', code: '-07'}},
                {label: 'UTC-06.00', value: {id: 8, name: 'UTC-06.00', code: '-06'}},
                {label: 'UTC-05.00', value: {id: 9, name: 'UTC-05.00', code: '-05'}},
                {label: 'UTC-04.00', value: {id: 10, name: 'UTC-04.00', code: '-04'}},
                {label: 'UTC-03.30', value: {id: 11, name: 'UTC-03.30', code: '-33'}},
                {label: 'UTC-03.00', value: {id: 12, name: 'UTC-03.00', code: '-03'}},
                {label: 'UTC-02.00', value: {id: 13, name: 'UTC-02.00', code: '-02'}},
                {label: 'UTC-01.00', value: {id: 14, name: 'UTC-01.00', code: '-01'}},
                {label: 'UTC-+00.00', value: {id: 15, name: 'UTC-+00.00', code: '-00'}},
                {label: 'UTC+01.00', value: {id: 16, name: 'UTC+01.00', code: '+01'}},
                {label: 'UTC+02.00', value: {id: 17, name: 'UTC+02.00', code: '+02'}},
                {label: 'UTC+03.00', value: {id: 18, name: 'UTC+03.00', code: '+03'}},
                {label: 'UTC+03.30', value: {id: 19, name: 'UTC+03.30', code: '+33'}},
                {label: 'UTC+04.00', value: {id: 20, name: 'UTC+04.00', code: '+04'}},
                {label: 'UTC+04.30', value: {id: 21, name: 'UTC+04.30', code: '+43'}},
                {label: 'UTC+05.00', value: {id: 22, name: 'UTC+05.00', code: '+05'}},
                {label: 'UTC+05.30', value: {id: 23, name: 'UTC+05.30', code: '+53'}},
                {label: 'UTC+05.45', value: {id: 24, name: 'UTC+05.45', code: '+54'}},
                {label: 'UTC+06.00', value: {id: 25, name: 'UTC+06.00', code: '+06'}},
                {label: 'UTC+06.30', value: {id: 26, name: 'UTC+06.30', code: '+63'}},
                {label: 'UTC+07.00', value: {id: 27, name: 'UTC+07.00', code: '+07'}},
                {label: 'UTC+08.00', value: {id: 28, name: 'UTC+08.00', code: '+08'}},
                {label: 'UTC+08.45', value: {id: 29, name: 'UTC+08.45', code: '+84'}},
                {label: 'UTC+09.00', value: {id: 30, name: 'UTC+09.00', code: '+09'}},
                {label: 'UTC+09.30', value: {id: 31, name: 'UTC+09.30', code: '+93'}},
                {label: 'UTC+10.00', value: {id: 32, name: 'UTC+10.00', code: '+10'}},
                {label: 'UTC+10.30', value: {id: 33, name: 'UTC+10.30', code: '+13'}},
                {label: 'UTC+11.00', value: {id: 34, name: 'UTC+01.00', code: '+11'}},
                {label: 'UTC+12.00', value: {id: 35, name: 'UTC+01.00', code: '+12'}},
                {label: 'UTC+12.45', value: {id: 36, name: 'UTC+01.00', code: '+24'}},
                {label: 'UTC+13.00', value: {id: 37, name: 'UTC+01.00', code: '+13'}},
                {label: 'UTC+14.00', value: {id: 38, name: 'UTC+01.00', code: '+14'}},
            ],
            dropdownOptions2: [
                {label: 'Where did you hear Babylon', value: null},
                {label: 'Blogs', value: 'Blogs'},
                {label: 'Google Ads', value: 'google'},
                {label: 'Your Forum', value: 'prime-forum'},
                {label: 'Youtube', value: 'Youtube'},
                {label: 'Reddit', value: 'Reddit'},
                {label: 'Events', value: 'Events'},
                {label: 'Other', value: 'Other'}
            ]
        }
    },
    methods: {
        clickNext(step) {
            this.activeTab = step;
        },

        selectTier(card) {
            this.activeCard = card;
        }
    }
}
</script>