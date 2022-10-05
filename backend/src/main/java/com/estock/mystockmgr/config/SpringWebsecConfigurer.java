package com.estock.mystockmgr.config;


import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.estock.mystockmgr.services.CustomUserDetailsServiceManager;

@Configuration
@EnableWebSecurity
@EnableWebMvc
public class SpringWebsecConfigurer {

    @Autowired
    DataSource datasource;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests((authz) -> {
            try {
                authz.anyRequest().permitAll();
                // authz.anyRequest().authenticated().and().formLogin().defaultSuccessUrl("/index");

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
            );
            http.cors().and().csrf().disable();
        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService(){
        return new CustomUserDetailsServiceManager();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(gePasswordEncoder());
        return authProvider;
    }

@Bean
public WebMvcConfigurer CORSConfigurer() {
    return new WebMvcConfigurer() {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")
                    .allowedOrigins("*")
                    .allowedHeaders("*")
                    .allowedMethods("*") //.allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD")
                    .maxAge(-1)   // add maxAge
                    .allowCredentials(false);
        }
    };
}

    

    // @Bean
    // public UserDetailsManager users(DataSource dataSource) {
    //     UserDetails user = User.withUsername("test").password("test").roles("ADMIN").accountLocked(false).build();
    //     JdbcUserDetailsManager users = new JdbcUserDetailsManager(dataSource);
    //     users.createUser(user);
    //     return users;
    // }

    @Bean
    public PasswordEncoder gePasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

    

}
